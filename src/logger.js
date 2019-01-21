// @flow

import {allowedTypes} from './constants';

type ArgType = {[string]: any};

export const log = (data: any, args: ArgType = {}) => {
  const {type} = args;
  let method = console.log;
  if (allowedTypes.includes(type)) {
    method = console[type];
  }

  method(data);
};

export const logInfo = (info: string) => {
  log(info);
};

export const logError = (error: string | Error) => {
  log(error, {type: 'error'});
};
