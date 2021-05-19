import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {MessageModel} from '../models/message.model';

@Injectable({ providedIn: 'root' })

export class ConversationService {
  messages: MessageModel[] = [];
  counter: any = 0;

  // bot: UserModel;

  constructor() {
    // this.bot.name = 'bot';
    // this.bot.avatar = '';
    // tslint:disable-next-line:max-line-length
    this.addMsg(
      '',
      'Hi, what is your name?',
      false,
      new UserModel('bot', 'https://i.gifer.com/no.gif'),
      Date.now(),
      '',
      '',
      null,
      null);
  }


  // tslint:disable-next-line:max-line-length
  addMsg(type: string, text: string, reply: boolean, user: UserModel, date: number, files: string, quote: string, latitude: number, longitude: number): void {
    this.messages[this.counter] = new MessageModel(type, text, reply, user, date, files, quote, latitude, longitude);
    this.counter++;
    console.log('added');
  }

  clearConv(): void {
    this.messages.length = 0;
    this.counter = 0;
  }
}
