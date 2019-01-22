import test from 'ava';
import sinon, {spy} from 'sinon';
import Logger from '../src';
import * as methods from '../src/logger';
import * as types from '../src/types';

let logSpy;
let clock;
test.before(() => {
  logSpy = spy(methods, 'log');
  clock = sinon.useFakeTimers();
});

test.after.always(() => {
  if (logSpy) {
    logSpy.restore();
  }

  clock.restore();
});

test('can create a logger with generic scope', t => {
  const logger = new Logger();

  t.is(logger.scope, null);
});

test('can create a logger with a specified scope', t => {
  const scope = 'scope';
  const logger = new Logger({scope});

  t.is(logger.scope, scope);
});

test('logs without scope', t => {
  const logger = new Logger();
  const msg = 'some info';

  logger.logInfo(msg);

  t.true(logSpy.calledWith(msg, {type: types.INFO, scope: null}));
});

test('logs with scope', t => {
  const scope = 'scope';
  const logger = new Logger({scope});
  const msg = 'some info';

  logger.logInfo(msg);

  t.true(logSpy.calledWith(msg, {type: types.INFO, scope}));
});

test('errors without scope', t => {
  const logger = new Logger();
  const msg = 'some info';

  logger.logError(msg);

  t.true(logSpy.calledWith(msg, {type: types.ERROR, scope: null}));
});

test('errors with scope', t => {
  const scope = 'scope';
  const logger = new Logger({scope});
  const msg = 'some info';

  logger.logError(msg);

  t.true(logSpy.calledWith(msg, {type: types.ERROR, scope}));
});

test('can log object with scope', t => {
  const scope = 'scope';
  const logger = new Logger({scope});
  const msg = {a: 1, b: 2};

  logger.logInfo(msg);

  t.true(logSpy.calledWith(msg, {type: types.INFO, scope}));
});

test('can accept a database transport as an argument', t => {
  const database = {
    save: spy()
  };

  const logger = new Logger({database});

  t.is(logger.database, database);
});

test('calls the database transport save method when a log is executed', t => {
  const save = spy();
  const database = {
    save
  };

  const logger = new Logger({database});

  const data = {a: 1, b: 2};
  const timestamp = new Date();

  logger.logInfo(data);
  const expected = {
    scope: null,
    type: types.INFO,
    data,
    timestamp
  };

  t.deepEqual(save.lastCall.args[0], expected);
});

test('does not error if no database transport is provided', t => {
  const logger = new Logger();
  const data = 1;

  const fn = () => logger.logInfo(data);

  t.notThrows(fn);
});
