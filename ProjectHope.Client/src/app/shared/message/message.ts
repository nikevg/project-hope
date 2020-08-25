import { MessageType } from './message-type';

export interface Message {
  value: string;
  type: MessageType;
}
