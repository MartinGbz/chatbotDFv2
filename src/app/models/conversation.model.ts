import {MessageModel} from './message.model';

export class ConversationModel {
  botMsg: MessageModel;
  userMsg: MessageModel;

  constructor(botMsg: MessageModel) {
    this.botMsg = botMsg;
  }
}

