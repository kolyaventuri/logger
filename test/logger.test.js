import test from 'ava';
import {spy} from 'sinon';

import {
  log,
  logInfo,
  logError
} from '../src/logger';

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

test('`log` logs to console by default', t => {
  const msg = 'some info log test';
  log(msg);

  t.true(logStub.calledWith(msg));
});

test('`logInfo` only logs to console', t => {
  const msg = 'some info logInfo test';
  logInfo(msg);

  t.true(logStub.calledWith(msg));
});

test('`log` can be told to log error', t => {
  const msg = 'some info error log test';
  log(msg, {type: 'error'});

  t.true(errorStub.calledWith(msg));
});

test('`logError` logs to error', t => {
  const msg = 'some info error test';
  logError(msg);

  t.true(errorStub.calledWith(msg));
});
