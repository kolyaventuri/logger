// @flow

import {log} from './logger';

export default class Logger {
  scope: string | null;
  scopeTag: string;

  constructor(scope?: string) {
    this.scope = scope || null;
    this.scopeTag = scope ? `[${scope}] ` : '';
  }

  log = (data: any, type: ?string) => {
    log(data, {type});
  }

  logInfo(info) {
    const {scopeTag} = this;
    log(`${scopeTag}${info}`);
  }

  logError(error) {
    const {scopeTag} = this;
    this.log(`${scopeTag}${error}`, 'error');
  }
}
