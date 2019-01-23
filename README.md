# Logger
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Drop-in, zero-dependency scoped logger. Allows for better event tracking, by providing distinguishable log outputs per module / section of a project.

## Installation
No NPM package exists yet, so install with `npm i https://github.com/kolyaventuri/logger.git`

## Usage
Usage is simple! Just drop in, instantiate, and use!

```js
import Logger from 'logger';

const {logInfo, logError} = new Logger();

logInfo('Hello, world!'); // [INFO] Hello, world!
logError('Something is wrong.') // [ERROR] Something is wrong. (As an error)

logInfo({hello: 'World'}); // [INFO] {hello: 'World'}
```

Scoping is as easy as providing a name upon instantiation

```js
const {logInfo} = new Logger({scope: 'MY_SCOPE'});

logInfo('Hello, world!'); // [MY_SCOPE] [INFO] Hello, world!
```


## Database logging
Logger allows you to connect a custom database transport layer for easy saving of your logs. This database transport is in the following form
```js
type DatabaseType = {
  save: data => void
};
```

Usage of the transport layer is simple!
```js
const database = {
  save: data => {
    // Save your log data
  }
};

const {logInfo} = new Logger({database})

logInfo('Hello, world!'); // database.save will be called
```

Data will be passed to `database.save` in the following format for you to handle
```js
type Data = {
  data: any, // the information passed to the logger
  type: 'info' | 'error', // default is 'info'
  scope: string,
  timestamp: Date,
  ...extraArguments // Any additional arguments passed to logger
};
```


## Running tests
Test can be run as easily as `npm test`
The rest runner of choice is [Ava](https://github.com/avajs/ava).
Code style is enforced with [XO](https://github.com/xojs/xo).
Files are typed with [Flow](https://flow.org).

## Contributing
Feel free to pick up any issues you see! Just fork, make the changes, and open a pull request.

## Notes
Even though I am calling this a "zero-dependency" logger, there are development dependencies. The module itself requires no dependencies.
