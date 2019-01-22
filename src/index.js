// @flow

import {log} from './logger';
import * as types from './types';

type DatabaseType = {
  save: (data: any) => void
};

type ArgType = {
  scope?: string,
  database?: DatabaseType
};

const noop = () => {};

export default class Logger {
  scope: string | null;

  database: DatabaseType;

  constructor({scope, database}: ArgType = {}) {
    this.scope = scope || null;
    this.database = database || {save: noop};
  }

  log = (data: any, args: {[string]: any} = {}) => {
    const {scope, database} = this;
    let {type, ...extraArgs} = args;
    type = type || types.INFO;

    const logResult = log(data, {type, scope, ...extraArgs});

    if (typeof database.save === 'function') {
      database.save(logResult);
    }
  }

  logInfo = (info: any) => {
    this.log(info);
  }

  logError = (error: any) => {
    this.log(error, {type: types.ERROR});
  }
}
