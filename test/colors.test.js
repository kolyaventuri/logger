import test from 'ava';

import {colors, colorize} from '../src/colors';

test('colorizes test', t => {
  const text = 'Test';
  const expected = `\u001B[31m${text}\u001B[0m`;

  const result = colorize(colors.RED, text);

  t.is(result, expected);
});
