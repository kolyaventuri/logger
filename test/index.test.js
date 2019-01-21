import test from 'ava';
import Logger from '../src';

test('Can create a logger with generic scope', t => {
  const logger = new Logger();

  t.is(logger.scope, null);
});

test('Can create a logger with a specified scope', t => {
  const scope = 'scope';
  const logger = new Logger(scope);

  t.is(logger.scope, scope);
});
