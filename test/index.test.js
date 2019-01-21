import test from 'ava';
import {spy} from 'sinon';
import Logger from '../src';

let logStub;
let errorStub;
test.before(() => {
  logStub = spy(console, 'log');
  errorStub = spy(console, 'error');
});

test.after.always(() => {
  logStub.restore();
  errorStub.restore();
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

  t.true(logStub.calledWith(msg));
});

test('Logs with scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);
  const msg = 'some info';

  logger.logInfo(msg);

  const expected= `[${scope}] ${msg}`;
  t.true(logStub.calledWith(expected));
});

test('Errors without scope', t => {
  const logger = new Logger();
  const msg = 'some info';

  logger.logError(msg);

  t.true(errorStub.calledWith(msg));
});

test('Errors with scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);
  const msg = 'some info';

  logger.logError(msg);

  const expected= `[${scope}] ${msg}`;
  t.true(errorStub.calledWith(expected));
});
