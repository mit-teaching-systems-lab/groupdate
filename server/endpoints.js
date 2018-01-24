const _ = require('lodash');

// Returns a Promise of:
// [{text}]
function queryForCards(pool, code) {
  const sql = `
    SELECT id, text
    FROM cards
    WHERE code = $1
    ORDER BY timestampz;`;
  const values = [code];
  return pool.query(sql, values);
}

// Returns a Promise of `groupings`:
// [{color, letter, cards:[{id, text}]}]
function queryForGroupings(pool, code, groupCount) {
  const sql = `
    SELECT
      ratings.rating, ratings.session_id, cards.id, cards.text
    FROM ratings
    FULL OUTER JOIN cards ON cards.id = ratings.card_id
    WHERE cards.code = $1
  ;`;
  const values = [code];

  return pool.query(sql, values)
    .then(results => createGroupingsFromRatings(results.rows, groupCount));
}

// Create groupings of cards based on ratings.
// [{color, letter, cards}], where cards = [{id, text}]
function createGroupingsFromRatings(rows, groupCount) {
  // compute scores
  const bySession = _.groupBy(rows, 'session_id');
  var votesByCardId = {};
  Object.keys(bySession).map(sessionId => {
    const sessionRows = bySession[sessionId];
    const ratingsCount = sessionRows.filter(row => row.rating === 0 || row.rating > 0).length;
    const byCard = _.groupBy(sessionRows, 'id');
    Object.keys(byCard).map(cardId => {
      const row = byCard[cardId][0]; // assume only one rating per session per card, take first if more than one
      if (row.rating > 0) {
        const votes = Math.round(100 / ratingsCount); // weight votes my how many ratings they made
        votesByCardId[cardId] = (votesByCardId[cardId] || 0) + votes;
      }
    });
  });

  // score and sort
  const cards = _.uniqBy(rows, 'id').map(row => {
    return {
      id: row.id,
      text: row.text
    };
  });
  const cardsWithScores = cards.map(card => {
    return {
      id: card.id,
      text: card.text,
      score: votesByCardId[card.id]
    };
  });
  const sortedCards = _.sortBy(cardsWithScores, card => card.score * -1);

  // group by scores, round-robin
  const chunks = _.chunk(sortedCards, groupCount);
  const cardsForGroupings = _.zip(...chunks);

  // add in letters and colors
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];
  const colors = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928',
  ];
  return cardsForGroupings.map((cards, index) => {
    return {
      letter: letters[index],
      color: colors[index],
      cards: _.compact(cards)
    };
  });
}

// Adding a card for a game
function addCardEndpoint(pool, req, res) {
  res.set('Content-Type', 'application/json');

  const {code} = req.params;
  const {text, sessionId} = req.body;

  // Write into database
  const sql = `
    INSERT INTO cards(code, text, session_id, timestampz)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
  const now = new Date();
  const values = [code, text, sessionId, now];
  pool.query(sql, values)
    .then(results => {
      const card = {
        id: results.rows[0].id,
        text
      };
      res.json({ status: 'ok', card });
    })
    .catch(err => {
      console.log('query returned err: ', err);
      console.log({ error: err });
      res.json({ status: 'error' });
    });
}

// For receiving cards for a `code`
// Returns: {status, rows}
// where rows: [{text}]
function cardsEndpoint(pool, req, res) {
  res.set('Content-Type', 'application/json');
  
  const {code} = req.params;
  queryForCards(pool, code)
    .catch(err => {
      console.log('query returned err: ', err);
      res.json({ status: 'error' });
    })
    .then(result => {
      res.json({
        status: 'ok',
        rows: result.rows
      });
    });
}


// Rate a card
function addRatingEndpoint(pool, req, res) {
  const cardId = req.params.card;
  const {rating, sessionId} = req.body;

  // Write into database
  const sql = `
    INSERT INTO ratings(card_id, rating, session_id, timestampz)
    VALUES ($1, $2, $3, $4)`;
  const now = new Date();
  const values = [cardId, rating, sessionId, now];
  pool.query(sql, values).catch(err => {
    console.log('query returned err: ', err);
    console.log({ error:err });
  });

  // Return success no matter what
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
}


function groupingsEndpoint(pool, req, res) {
  res.set('Content-Type', 'application/json');
  
  const {code} = req.params;
  const groupCount = req.query.n;
  queryForGroupings(pool, code, groupCount)
    .catch(err => {
      console.log('query returned err: ', err);
      res.json({ status: 'error' });
    })
    .then(groupings => {
      res.json({
        status: 'ok',
        groupCount,
        groupings: groupings
      });
    });
}


module.exports = {
  cardsEndpoint,
  addCardEndpoint,
  addRatingEndpoint,
  groupingsEndpoint
};