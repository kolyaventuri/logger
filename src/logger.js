// @flow

import {allowedTypes} from './constants';

type ArgType = {[string]: any};

export const log = (data: any, args: ArgType = {}) => {
  const {type, scope} = args;

  let method = console.log;
  if (allowedTypes.includes(type)) {
    method = console[type];
  }

  if (scope) {
    const scopeString = `[${scope}]`;
    return method(scopeString, data);
  }

  return method(data);
};
