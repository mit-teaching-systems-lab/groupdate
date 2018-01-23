const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {enforceHTTPS} = require('./util/https.js');
const {createPool} = require('./util/database.js');
const {
  cardsEndpoint,
  addCardEndpoint,
  addRatingEndpoint,
  groupingsEndpoint
} = require('./endpoints.js');

// config
const config = {
  port: process.env.PORT || 4000,
  mailgunEnv: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN
  },
  postgresUrl: (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true'
};

// Create server with middleware, connect to database
const app = express();
app.use(bodyParser.json());
app.use(enforceHTTPS);
const pool = createPool(config.postgresUrl);


// Endpoints for the game
app.get('/hello', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json({ status: 'ok' });
});
app.get('/games/:code/cards', cardsEndpoint.bind(null, pool));
app.post('/games/:code/card', addCardEndpoint.bind(null, pool));
app.post('/cards/:card/rating', addRatingEndpoint.bind(null, pool));
app.get('/games/:code/groupings', groupingsEndpoint.bind(null, pool));


// Serve any static files.
// Route other requests return the React app, so it can handle routing.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// Start the server
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});