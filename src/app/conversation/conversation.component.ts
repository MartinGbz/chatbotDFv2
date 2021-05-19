import { Component, OnInit } from '@angular/core';
import {ConversationService} from '../services/conversation.service';
import {UserModel} from '../models/user.model';
import {ChatbotService} from '../services/chatbot.service';
import {SpeechToTextService} from '../services/speech-to-text.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  curMsg: string;

  // tslint:disable-next-line:max-line-length
  constructor(public convService: ConversationService, private chatbotService: ChatbotService, public speechToTextService: SpeechToTextService) {
    speechToTextService.init();
    this.curMsg = speechToTextService.text;
  }

  ngOnInit(): void {
    this.speechToTextService.endSpeechEvent.subscribe(
      (text) => {
        const obj = {message: text, files: []};
        console.log(obj);
        this.sendMsg(obj);
      }
    );
  }


  sendMsg($event: { message: string; files: File[] }): void {
    console.log($event.message);
    this.curMsg = $event.message;
    this.convService.addMsg('',
      this.curMsg,
      true,
      new UserModel('Me', ''),
      Date.now(),
      '',
      '',
      null,
      null);
    this.chatbotService.sendMessage(this.curMsg);
    document.getElementById('btnRec').classList.remove('disabled');
  }

  clearConv($event: any): void {
    this.convService.clearConv();
    console.log('add');
    this.convService.addMsg(
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

  startService(): void{
    document.getElementById('btnRec').classList.add('disabled');
    this.speechToTextService.start();
  }
}
