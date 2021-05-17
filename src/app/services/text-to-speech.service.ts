import {Injectable} from '@angular/core';
import Speech from 'speak-tts';

@Injectable({
  providedIn: 'root'
})

export class TextToSpeechService {
  constructor() {}

  speakInit(speech: Speech, speechData: any): void{
    if (speech.hasBrowserSupport()) { // returns a boolean
      console.log('speech synthesis supported');
      speech.init({
        volume: 1,
        lang: 'en-GB',
        rate: 1,
        pitch: 1,
        voice: 'Google UK English Male',
        splitSentences: true,
        listeners: {
          onvoiceschanged: (voices) => {
            // console.log('Event voiceschanged', voices);
          }
        }
      }).then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log('Speech is ready, voices are available', data);
        speechData = data;
        data.voices.forEach(voice => {
          // console.log(voice.name + ' ' + voice.lang);
        });
      }).catch(e => {
        console.error('An error occured while initializing : ', e);
      });
    }
  }

  speak(speech: Speech, msg: string): void{
    speech.speak({
      text: msg,
    }).then(() => {
      console.log('Success !');
    }).catch(e => {
      console.error('An error occurred :', e);
    });
  }
}
