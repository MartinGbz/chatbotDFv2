import {UserModel} from './user.model';

export class MessageModel {
  type: string;
  text: string;
  reply: boolean;
  user: UserModel;
  date: string;
  files: string;
  quote: string;
  latitude: string;
  longitude: string;

  // tslint:disable-next-line:max-line-length
  constructor(type: string, text: string, reply: boolean, user: UserModel, date: string, files: string, quote: string, latitude: string, longitude: string) {
    this.type = type;
    this.text = text;
    this.reply = reply;
    this.user = user;
    this.date = date;
    this.files = files;
    this.quote = quote;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
