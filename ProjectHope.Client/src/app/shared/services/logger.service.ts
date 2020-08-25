import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  private get date(): string {
    return new Date().toString();
  }

  constructor() {}

  log(message: string) {
    console.log(this.date, `\n${message}`);
  }

  warn(message: string) {
    console.warn(this.date, `\n${message}`);
  }

  error(message: string) {
    console.error(this.date, `\n${message}`);
  }
}
