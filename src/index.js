// @flow

import {log} from './logger';
import * as types from './types';

type DatabaseType = {
  save: Function
};

type ArgType = {
  scope?: string,
  database?: DatabaseType
};

export default class Logger {
  scope: string | null;

  database: DatabaseType | null;

  constructor({scope, database}: ArgType = {}) {
    this.scope = scope || null;
    this.database = database || null;
  }

  log = (data: any, args: {[string]: any} = {}) => {
    const {scope} = this;
    let {type} = args;
    type = type || types.INFO;

    log(data, {type, scope});
  }

  logInfo(info: any) {
    this.log(info);
  }

  logError(error: any) {
    this.log(error, {type: types.ERROR});
  }
}
