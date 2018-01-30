# groupdate

...
## TODO
- /create to make new groupdate as leader, get code
- leader coordinates when ready
- gyro play while wait

ideas:
- machine learning by words
- restart > add more



## Development
To setup locally:
```
$ yarn install
```

Create database:
```
CREATE DATABASE "groupdate";
\c groupdate;
CREATE TABLE cards (
  id serial primary key,
  code text,
  text text,
  session_id text,
  timestampz timestamptz
);

CREATE TABLE ratings (
  id serial primary key,
  card_id integer,
  rating integer,
  session_id text,
  timestampz timestamptz
);
```

### To develop locally:
```
$ yarn start
```

This will run the server and the create-react-app development server in parallel, writing the output of both to stdout.

Note that the site is responsive and will include a fake frame for an iPhone 5 running Safari at desktop resolution.

Running `yarn start` will also start a [storybook](https://github.com/storybooks/storybook) server on port 9001.  You can use this to create "stories" iterate on UI features.


### To run tests:
```
$ yarn test
```

You can also run the linter and tests independently for the server or client code, see `package.json` for commands.
