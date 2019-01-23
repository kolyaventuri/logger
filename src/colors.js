// @flow
import * as types from './types';

const open = '\u001B[';
const close = 'm';

const reset = 0;

const fgRed = 31;
const fgGreen = 32;
const fgCyan = 36;

const color = code => `${open}${code}${close}`;

export const colors = {
  RESET: 'RESET',

  RED: 'RED',
  GREEN: 'GREEN',
  CYAN: 'CYAN'
};
type Color = $Keys<typeof colors>;

const codes = {
  [colors.RESET]: color(reset),

  [colors.RED]: color(fgRed),
  [colors.GREEN]: color(fgGreen),
  [colors.CYAN]: color(fgCyan)
};

export const tagColors = {
  [types.SCOPE]: colors.GREEN,
  [types.INFO]: colors.CYAN,
  [types.ERROR]: colors.RED
};

export const colorize = (color: Color, text: string) => {
  const reset = codes[colors.RESET];
  const openColor = codes[color];

  return `${openColor}${text}${reset}`;
};
