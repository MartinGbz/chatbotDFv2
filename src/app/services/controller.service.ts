import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TextToSpeechService} from './text-to-speech.service';
import {ConversationService} from './conversation.service';
import {UserModel} from '../models/user.model';
import Speech from 'speak-tts';

@Injectable({ providedIn: 'root' })

export class ControllerService {

  speech: any;
  speechData: any;

  bot: UserModel;

  constructor(private textToSpeechService: TextToSpeechService, private convService: ConversationService) {
    // Voice
    this.speech = new Speech(); // will throw an exception if not browser supported
    textToSpeechService.speakInit(this.speech, this.speechData);

    this.bot = new UserModel('Bot', 'https://i.gifer.com/no.gif');
  }

  controller(rep): void {
    if (rep.intents.length !== 0) {
      switch (rep.intents[0].name) {
        case 'temperature_set':
          console.log('Okay, I have to set the temperature');
          // tslint:disable-next-line:max-line-length
          this.textToSpeechService.speak(this.speech, 'Okay I change the temperature for' + rep.entities['wit$temperature:temperature'][0].value + 'degrees');
          console.log(`Okay I change the temperature for ${rep.entities['wit$temperature:temperature'][0].value} degrees`);
          this.sendReplyBot(rep, `Okay I change the temperature for ${rep.entities['wit$temperature:temperature'][0].value} degrees`);
          break;

        case 'temperature_get':
          console.log('Okay, I have to get the temperature');
          this.textToSpeechService.speak(this.speech, 'Okay, I have to get the temperature');
          this.sendReplyBot(rep, `Okay, I have to get the temperature`);
          // turn the temperature to 70 degrees
          break;

        case 'name_set':
          console.log('Okay, I have to set the name');
          this.textToSpeechService.speak(this.speech, 'Hi' + rep.entities['wit$contact:contact'][0].value + '!');
          this.sendReplyBot(rep, 'Hi ' + rep.entities['wit$contact:contact'][0].value + '!');
          break;

        default:
          console.log('Sorry, I didn\'t understand your question...');
          this.textToSpeechService.speak(this.speech, 'Sorry, I didn\'t understand your question...');
          this.sendReplyBot(rep, 'Sorry, I didn\'t understand your question...');
          break;
      }
    } else {
      console.log('Sorry, I didn\'t understand your question...');
      this.textToSpeechService.speak(this.speech, 'Sorry, I didn\'t understand your question...');
      this.sendReplyBot(rep, 'Sorry, I didn\'t understand your question...');
    }
  }

  sendReplyBot(rep, text): void{
    this.convService.addMsg('',
      text, false, this.bot, Date.now().toString(), '', '', '', '');
  }
}
