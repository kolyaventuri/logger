// @flow

import {log} from './logger';
import * as types from './types';

type DatabaseType = {
  save: (data: any) => void
};

type ArgType = {
  scope?: string,
  database?: DatabaseType,
  color?: boolean
};

const noop = () => {};

export default class Logger {
  scope: string | null;

  database: DatabaseType;

  color: boolean;

  constructor({scope, database, color}: ArgType = {}) {
    this.scope = scope || null;
    this.database = database || {save: noop};
    this.color = !(color === false);
  }

  log = (data: any, args: {[string]: any} = {}) => {
    const {scope, database, color} = this;
    let {type, ...extraArgs} = args;
    type = type || types.INFO;

    const logResult = log(data, {type, scope, color, ...extraArgs});

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
