// @flow

import {typeMap} from './constants';
import * as types from './types';

type ArgType = {[string]: any};

export const log = (data: any, args: ArgType = {}) => {
  const {type: _type, scope, ...extraArgs} = args;
  const type = _type || types.INFO;

  const methodName = typeMap[type] || 'log';
  const method = console[methodName];

  const typeTag = `[${type}]`;

  if (scope) {
    const scopeTag = `[${scope}]`;
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
