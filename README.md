# groupdate

...

## Development
To setup locally:
```
$ yarn install
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
