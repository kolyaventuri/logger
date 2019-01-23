import test from 'ava';
import sinon, {spy} from 'sinon';

import {
  log
} from '../src/logger';
import * as types from '../src/types';
import {colors, colorize} from '../src/colors';

const infoTag = colorize(colors.CYAN, `[${types.INFO}]`);
const errorTag = colorize(colors.RED, `[${types.ERROR}]`);

let logStub;
let errorStub;
let clock;
test.before(() => {
  logStub = spy(console, 'log');
  errorStub = spy(console, 'error');
  clock = sinon.useFakeTimers(new Date().getTime());
});

test.after.always(() => {
  logStub.restore();
  errorStub.restore();
  clock.restore();
});

test('logs to console by default', t => {
  const msg = 'some info log test';
  log(msg);

  t.true(logStub.calledWith(infoTag, msg));
});

test('can be told to log error', t => {
  const msg = 'some info error log test';
  log(msg, {type: types.ERROR});

  t.true(errorStub.calledWith(errorTag, msg));
});

test('can be provided a scope', t => {
  const msg = 'some info';
  const scope = 'scope';

  log(msg, {scope});

  t.true(logStub.calledWith(`[${scope}]`, infoTag, msg));
});

test('doesn\'t stringify input data', t => {
  const data = {a: 1, b: 2};
  log(data);

  t.true(logStub.calledWith(infoTag, data));
});

test('doesn\'t stringify input data when scoped', t => {
  const data = {a: 1, b: 2};
  const scope = 'scope';

  log(data, {scope});

  t.true(logStub.calledWith(`[${scope}]`, infoTag, data));
});

test('returns a formatted data object containing logged information', t => {
  const data = {a: 1, b: 2};
  const timestamp = new Date();

  const result = log(data);
  const expected = {
    scope: undefined,
    type: types.INFO,
    data,
    timestamp
  };

  t.deepEqual(result, expected);
});

test('can return scope and type', t => {
  const data = {a: 1, b: 2};
  const scope = 'scope';
  const type = types.ERROR;
  const timestamp = new Date();

  const result = log(data, {scope, type});

  const expected = {
    scope,
    type,
    data,
    timestamp
  };

  t.deepEqual(result, expected);
});

test('can return arbitrary arguments', t => {
  const data = 1;
  const timestamp = new Date();
  const args = {a: 1, b: 2};

  const result = log(data, args);

  const expected = {
    scope: undefined,
    type: types.INFO,
    data,
    timestamp,
    ...args
  };

  t.deepEqual(result, expected);
});

test('can disable color', t => {
  const msg = 'test';

  log(msg, {color: false});

  t.true(logStub.calledWith(`[${types.INFO}]`, msg));
});
