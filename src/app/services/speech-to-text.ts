import { Injectable } from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechToText {

  recognition =  new webkitSpeechRecognition();
  public text = '';
  tempWords;

  constructor() { }

  init(): void {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start(): void {
    this.recognition.start();
    console.log('Speech recognition started');
    this.recognition.addEventListener('end', (condition) => {
      this.text = this.tempWords;
      this.recognition.stop();
      console.log('End speech recognition');
    });
  }

  stop(): void {
    console.log('2: End speech recognition');
  }

  wordConcat(): void {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
