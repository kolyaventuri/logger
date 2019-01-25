# Scriba 
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Drop-in, zero-dependency scoped logger. Allows for better event tracking, by providing distinguishable log outputs per module / section of a project.

## Installation
Simply install with `npm i scriba`

## Usage
Usage is simple! Just drop in, instantiate, and use!

```js
import Logger from 'scriba';

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

By default, output is colorized (green scope, and various colors for types). This can be disabled by passing a `color` argument into the `Logger` constructor.

```js
const {logInfo} = new Logger({color: false});
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

## Why "Scriba?"
_Scribae_ (literally: scribes) were public notaries in ancient Rome, tasked with recording official information on public tablets [Wikipedia](https://en.wikipedia.org/wiki/Scriba_(ancient_Rome)). The name seemed fitting, given that this package just writes down what you tell it.

## Notes
Even though I am calling this a "zero-dependency" logger, there are development dependencies. The module itself requires no dependencies.


## License: MIT
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
