// @flow

import {log} from './logger';
import * as types from './types';

export default class Logger {
  scope: string | null;

  constructor(scope?: string) {
    this.scope = scope || null;
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
