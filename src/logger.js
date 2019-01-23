// @flow

import {typeMap} from './constants';
import * as types from './types';

type ArgType = {[string]: any};

export const log = (data: any, args: ArgType = {}) => {
  const {type, scope, ...extraArgs} = args;

  const methodName = typeMap[type] || 'log';
  const method = console[methodName];

  if (scope) {
    const scopeString = `[${scope}]`;
    method(scopeString, data);
  } else {
    method(data);
  }

  return {
    data,
    type: type || types.INFO,
    scope,
    timestamp: new Date(),
    ...extraArgs
  };
};
