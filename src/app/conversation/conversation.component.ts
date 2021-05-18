import { Component, OnInit } from '@angular/core';
import {ChatbotComponent} from '../chatbot/chatbot.component';
import {ConversationService} from '../services/conversation.service';
import {UserModel} from '../models/user.model';
import {ChatbotService} from '../services/chatbot.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(public convService: ConversationService, private chatbotService: ChatbotService) { }

  ngOnInit(): void {
  }

  sendMsg($event: { message: string; files: File[] }): void {
    console.log($event.message);
    this.convService.addMsg('',
      $event.message,
      true,
      new UserModel('Me', ''),
      Date.now().toString(),
      '',
      '',
      '',
      '');
    this.chatbotService.sendMessage($event.message);
  }

  clearConv(): void {
    this.convService.clearConv();
    console.log('add');
    this.convService.addMsg(
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
}

export class ChatColorsComponent {
  chats: any[] = [
    {
      status: 'success',
      title: 'Nebular Conversational UI Success',
      messages: [
        {
          text: 'Success!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
          },
        },
      ],
    }];
}
