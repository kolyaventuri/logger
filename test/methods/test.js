import test from 'ava';
import {spy} from 'sinon';

import {
  log
} from '../../src/logger';
import * as types from '../../src/types';

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

test('logs to console by default', t => {
  const msg = 'some info log test';
  log(msg);

  t.true(logStub.calledWith(msg));
});

test('can be told to log error', t => {
  const msg = 'some info error log test';
  log(msg, {type: types.ERROR});

  t.true(errorStub.calledWith(msg));
});

test('can be provided a scope', t => {
  const msg = 'some info';
  const scope = 'scope';

  log(msg, {scope});

  t.true(logStub.calledWith(`[${scope}]`, msg));
});

test('doesn\'t stringify input data', t => {
  const data = {a: 1, b: 2};
  log(data);

  t.true(logStub.calledWith(data));
});

test('doesn\'t stringify input data when scoped', t => {
  const data = {a: 1, b: 2};
  const scope = 'scope';

  log(data, {scope});

  t.true(logStub.calledWith(`[${scope}]`, data));
});
