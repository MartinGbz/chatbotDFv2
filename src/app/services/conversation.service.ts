import {Injectable} from '@angular/core';
import {ConversationModel} from '../models/conversation.model';
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
      '',
      '',
      '',
      '',
      '');
  }


  // tslint:disable-next-line:max-line-length
  addMsg(type: string, text: string, reply: boolean, user: UserModel, date: string, files: string, quote: string, latitude: string, longitude: string): void {
    this.messages[this.counter] = new MessageModel(type, text, reply, user, date, files, quote, latitude, longitude);
    this.counter++;
    console.log('added');
  }

  clearConv(): void {
    this.messages.length = 0;
    this.counter = 0;
  }
}
