import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../message/message';

@Injectable()
export class MessageService {
  private _message = new Subject<Message>();

  receive(): Observable<Message> {
    return this._message.asObservable();
  }

  send(value: Message) {
    this._message.next(value);
  }
}
