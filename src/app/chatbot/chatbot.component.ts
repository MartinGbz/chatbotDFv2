import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';
import {SpeechRecognitionService} from '../services/speech.recognition.service';

import {TextToSpeechService} from '../services/text-to-speech.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  msg = null;

  // tslint:disable-next-line:max-line-length
  constructor(public serv: ChatbotService, public serviceSpeech: SpeechRecognitionService, public textTotSpeechService: TextToSpeechService) {
    serviceSpeech.init();

    this.msg = serviceSpeech.text;
  }


  ngOnInit(): void {
  }

  send(): void{
    console.log(this.msg);
    this.serv.sendMessage(this.serviceSpeech.text);
  }

  sendSpeech(): void {
    this.serv.sendSpeech(this.msg);
  }

  startService(): void{
    this.serviceSpeech.start();
  }

  stopService(): void{
    this.serviceSpeech.stop();
  }

}
