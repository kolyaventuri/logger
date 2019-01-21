// @flow

export default class Logger {
  scope: string | null;

  constructor(scope?: string) {
    this.scope = scope || null;
  }
}
