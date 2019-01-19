import {allowedTypes} from './constants';

export const log = (data, args = {}) => {
  const {type} = args;
  let method = console.log;
  if (allowedTypes.includes(type)) {
    method = console[type];
  }

  method(data);
};

export const logInfo = info => {
  log(info);
};

export const logError = error => {
  log(error, {type: 'error'});
};
