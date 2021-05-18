import {EventEmitter, Injectable, Output} from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {

  @Output() endSpeechEvent: EventEmitter<any> = new EventEmitter();

  recognition =  new webkitSpeechRecognition();
  public text = '';
  tempWords;

  i = 0;

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
    this.i = 0;
    console.log('Speech recognition started');
    this.recognition.addEventListener('end', (condition) => {
      this.text = this.tempWords;
      this.recognition.stop();
      console.log('End speech recognition');
      console.log(this.i);
      // program pass many times there and I don't know why
      // meanwhile, in order to fiw temporarily, I created a i variable
      if (this.i === 0) {
        console.log('Event');
        this.endSpeechEvent.emit(this.text);
      }
      this.i++;
      // this.endSpeechEvent.emit(this.text);
      // this.text = '';
      // this.tempWords = null;
      // this.init();
    });
  }

  stop(): void {
    // this.recognition.stop();
    console.log('2: End speech recognition');
  }

  wordConcat(): void {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
