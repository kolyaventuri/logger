// @flow

import {typeMap} from './constants';
import * as types from './types';
import {tagColors as colors, colorize} from './colors';

type ArgType = {[string]: any};

export const log = (data: any, args: ArgType = {}) => {
  const {type: _type, scope, color: _color, ...extraArgs} = args;
  const type = _type || types.INFO;
  const color = !(_color === false); // If `color` is undefined, it should still be true

  const methodName = typeMap[type] || 'log';
  const method = console[methodName];

  const typeTagRaw = `[${type}]`;
  const typeTag = color ? colorize(colors[type], typeTagRaw) : typeTagRaw;

  if (scope) {
    const scopeTagRaw = `[${scope}]`;
    const scopeTag = color ? colorize(colors[types.SCOPE], scopeTagRaw) : scopeTagRaw;
    method(scopeTag, typeTag, data);
  } else {
    method(typeTag, data);
  }

  return {
    data,
    type,
    scope,
    timestamp: new Date(),
    ...extraArgs
  };
};
