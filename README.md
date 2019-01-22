# Logger

Drop-in, zero-dependency scoped logger. Allows for better event tracking, by providing distinguishable log outputs per module / section of a project.

## Installation
No NPM package exists yet, so install with `npm i git@github.com:kolyaventuri/logger.git --production` (see the notes section about the `--production` flag)

## Usage
Usage is simple! Just drop in, instantiate, and use!

```js
import Logger from 'logger';

const {logInfo, logError} = new Logger();

logInfo('Hello, world!'); // Hello, world!
logError('Something is wrong.') // Something is wrong. (As an error)

logInfo({hello: 'World'}); // {hello: 'World'}
```

Scoping is as easy as providing a name upon instantiation

```js
const {logInfo} = new Logger('MY_SCOPE');

logInfo('Hello, world!'); // [MY_SCOPE] Hello, world!
```

## Contributing
Feel free to pick up any issues you see! Just fork, make the changes, and open a pull request.

## Notes
Even though I am calling this a "zero-dependency" logger, there are development dependencies. Just use the `--production` flag when installing to skip installing dev dependencies.
