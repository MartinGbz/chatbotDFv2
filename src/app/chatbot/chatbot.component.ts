import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';
import {SpeechToTextService} from '../services/speech-to-text.service';

import {TextToSpeechService} from '../services/text-to-speech.service';
import {ConversationService} from '../services/conversation.service';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})


export class ChatbotComponent implements OnInit {

  msg = null;

  // tslint:disable-next-line:max-line-length
  constructor(public serv: ChatbotService, public speechToTextService: SpeechToTextService, public textToSpeechService: TextToSpeechService, public convService: ConversationService) {
    speechToTextService.init();

    this.msg = speechToTextService.text;
  }


  ngOnInit(): void {
    this.speechToTextService.endSpeechEvent.subscribe(
      (text) => {
        console.log('text:');
        console.log(text);
        this.send(text);
      }
    );
  }

  send(value: string): void{
    this.serv.sendMessage(value);
  }

  sendSpeech(): void {
    console.log(this.msg);
    this.serv.sendSpeech(this.msg);
  }

  startService(): void{
    this.speechToTextService.start();
  }

  stopService(): void{
    this.speechToTextService.stop();
  }
}
