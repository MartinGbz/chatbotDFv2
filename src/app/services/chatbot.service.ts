import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GlobalVariables } from '../global.variables';

import {Injectable} from '@angular/core';

import {TextToSpeechService} from './text-to-speech.service';

import Speech from 'speak-tts';
import {ControllerService} from './controller.service';

interface RequestChatbot {
  queryInput: {
    text: {
      text: string
    },
    languageCode: string
  };
  queryParams: {
    timeZone: string
  };
}

/*interface responseWitPost {
  entities: {
    'wit$temperature:temperature': [{
      body: string
      confidence: string
      }]
  };
}*/

/* interface responseWitPost {
  'text': string;
  'intents': [
    {
      'id': string,
      'name': string,
      'confidence': number,
    }
  ],
  'entities': {
    'metric:metric': [
      {
        'id': string,
        'name': string,
        'role': string,
        'start': 9,
        'end': 15,
        'body': string,
        'value': string,
        'confidence': 0.9231,
        'entities': []
      }
    ],
    'wit$datetime:datetime': [
      {
        'id': string,
        'name': string,
        'role': string,
        'start': 16,
        'end': 42,
        'body': string,
        'confidence': 0.9541,
        'entities': [],
        'type': string,
        'from': {
          'grain': string,
          'value': string
        },
        'to': {
          'grain': string,
          'value': string
        },
        'values': [
          {
            'type': string,
            'from': {
              'grain': string,
              'value': string
            },
            'to': {
              'grain': string,
              'value': string
            }
          }
        ]
      ]
    }
  }
};
*/

@Injectable({ providedIn: 'root' })

export class ChatbotService {

  speech: any;
  speechData: any;

  constructor(private http: HttpClient, private textToSpeechService: TextToSpeechService, private controllerService: ControllerService) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    textToSpeechService.speakInit(this.speech, this.speechData);
  }

  // wit.AI
  sendMessage(msg: string): any {

    const headerDict = {
      Authorization: 'Bearer ' + GlobalVariables.ACCESS_TOKEN_WIT
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const encoder = new TextEncoder();
    // console.log(utf8Encode(msg));
    console.log(msg);
    console.log(encodeURI(msg));


    this.http.get('https://api.wit.ai/message?v=20210512&q=' + encodeURI(msg), requestOptions).subscribe(
      (reponse: any) => {
        console.log('reponse:');
        console.log(reponse);
        this.controllerService.controller(reponse);
       },
       (error) => {
         console.log('error:');
         console.log(error);
       }
     );
  }

  sendSpeech(audio: string): void {
    console.log('audio');
    console.log(audio);
    const headerDict = {
      Authorization: 'Bearer ' + GlobalVariables.ACCESS_TOKEN_WIT,
      'Content-type': 'audio/mpeg3',
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Request-Headers': '*',
      // 'Access-Control-Allow-Headers': '*',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    /*
    const body = {
      'data-binary': audio
      // audio_file: audio
    };
    */

    // console.log(requestOptions);

    this.http.post<any>('https://api.wit.ai/speech?v=20200513', audio, requestOptions).subscribe(
      (reponse: any) => {
        console.log('reponse:');
        console.log(reponse);
        // this.redirectToFunction(reponse);
      },
      (error) => {
        console.log('error:');
        console.log(error);
      }
    );
  }

  // controller(rep): void {
  //   if (rep.intents.length !== 0) {
  //     switch (rep.intents[0].name) {
  //       case 'temperature_set':
  //         console.log('Okay, I have to set the temperature');
  //         // tslint:disable-next-line:max-line-length
  //         this.textToSpeechService.speak(this.speech, 'Okay I change the temperature for' + rep.entities['wit$temperature:temperature'][0].value + 'degrees');
  //         console.log(`okay I change the temperature for ${rep.entities['wit$temperature:temperature'][0].value} degrees`);
  //
  //         // console.log('okay I change the temperature for ' + rep.entities.wit$temperature:temperature[0].value + 'degrees');
  //         // turn the temperature to 70 degrees
  //         break;
  //
  //       case 'temperature_get':
  //         console.log('Okay, I have to get the temperature');
  //         this.textToSpeechService.speak(this.speech, 'Okay, I have to get the temperature');
  //         // turn the temperature to 70 degrees
  //         break;
  //
  //       case 'name_set':
  //         console.log('Okay, I have to set the name');
  //         // this.textToSpeechService.speak(this.speech, 'Okay, I have to set the name');
  //         this.textToSpeechService.speak(this.speech, 'Hi' + rep.entities['wit$contact:contact'][0].value + '!');
  //         // wit$age_of_person:age_of_person
  //         // console.log(rep['entities']);
  //         break;
  //
  //       default:
  //         console.log('I didn\'t reconize your question');
  //         break;
  //     }
  //   }
  // }
}
