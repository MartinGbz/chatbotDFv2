import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';
import {SpeechToText} from '../services/speech-to-text';

import {TextToSpeechService} from '../services/text-to-speech.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  msg = null;

  // tslint:disable-next-line:max-line-length
  constructor(public serv: ChatbotService, public speechToTextService: SpeechToText, public textToSpeechService: TextToSpeechService) {
    speechToTextService.init();

    this.msg = speechToTextService.text;
  }


  ngOnInit(): void {
  }

  send(value: string): void{
/*    console.log('this.msg');
    console.log(this.msg);*/
    console.log('value:');
    console.log(value);
    // console.log(this.speechToTextService.text);
    // this.serv.sendMessage(this.speechToTextService.text);
    this.serv.sendMessage(value);
  }

  sendSpeech(): void {
    this.serv.sendSpeech(this.msg);
  }

  startService(): void{
    this.speechToTextService.start();
  }

  stopService(): void{
    this.speechToTextService.stop();
  }

}
