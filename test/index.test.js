import test from 'ava';
import {spy} from 'sinon';
import Logger from '../src';
import * as methods from '../src/logger';
import * as types from '../src/types';

let logSpy;
test.before(() => {
  logSpy = spy(methods, 'log');
});

test.after.always(() => {
  if (logSpy) {
    logSpy.restore();
  }
});

test('Can create a logger with generic scope', t => {
  const logger = new Logger();

  t.is(logger.scope, null);
});

test('Can create a logger with a specified scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);

  t.is(logger.scope, scope);
});

test('Logs without scope', t => {
  const logger = new Logger();
  const msg = 'some info';

  logger.logInfo(msg);

  t.true(logSpy.calledWith(msg, {type: types.INFO, scope: null}));
});

test('Logs with scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);
  const msg = 'some info';

  logger.logInfo(msg);

  t.true(logSpy.calledWith(msg, {type: types.INFO, scope}));
});

test('Errors without scope', t => {
  const logger = new Logger();
  const msg = 'some info';

  logger.logError(msg);

  t.true(logSpy.calledWith(msg, {type: types.ERROR, scope: null}));
});

test('Errors with scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);
  const msg = 'some info';

  logger.logError(msg);

  t.true(logSpy.calledWith(msg, {type: types.ERROR, scope}));
});

test('can log object with scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);
  const msg = {a: 1, b: 2};

  logger.logInfo(msg);

  t.true(logSpy.calledWith(msg, {type: types.INFO, scope}));
});
