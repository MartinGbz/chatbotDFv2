import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GlobalVariables } from '../global.variables';

import {Injectable} from '@angular/core';

import {TextToSpeechService} from './text-to-speech.service';

import Speech from 'speak-tts';

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

@Injectable({ providedIn: 'root' })

export class ChatbotService {

  speech: any;
  speechData: any;

  constructor(private http: HttpClient, private serviceTtoS: TextToSpeechService) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    serviceTtoS.speakInit(this.speech, this.speechData);
  }
    /*sendMessage(msg: string): any {
      console.log(msg);
      // const body: RequestChatbot = { {{text: msg}, languageCode: "en" }, {timeZone: ""}};
      // const body = {} as RequestChatbot;
      /!*    console.log(body);
          body.queryInput.text.text = msg;
          body.queryInput.languageCode = 'en';
          body.queryParams.timeZone = 'Europe/Madrid';*!/

      // tslint:disable-next-line:max-line-length
      // const body = JSON.parse('{ "queryInput":{"text":{"text": \"' + msg + '\"}, "languageCode": "en" }, "queryParams":{"timeZone": "Europe/Madrid" }');

      const headerDict = {
        Authorization: 'Bearer ' + GlobalVariables.ACCESS_TOKEN_GOOGLE,
        'Content-Type': 'application/json; charset=utf-8'
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      const body = {
        queryInput: {
          text: {
            text: msg
          },
          languageCode: 'en'
        },
        queryParams: {
          timeZone: 'Europe/Madrid'
        }
      };

      console.log(body);

      return new Promise((resolve, reject) => {
        this.http.post<RequestChatbot>('https://'
          + GlobalVariables.REGION_ID + '-dialogflow.googleapis.com/v3/projects/'
          + GlobalVariables.PROJECT_ID + '/locations/'
          + GlobalVariables.REGION_ID + '/agents/'
          + GlobalVariables.AGENT_ID + '/sessions/'
          + GlobalVariables.SESSION_ID + ':detectIntent', body, requestOptions).subscribe(
          (response) => {
            resolve(response);
            console.log(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }*/

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
        this.redirectToFunction(reponse);
       },
       (error) => {
         console.log('error:');
         console.log(error);
       }
     );

/*    return new Promise((resolve, reject) => {
      this.http.get('https://api.wit.ai/message?v=20210512&q=turn%20the%20temperature%20to%2070%20degrees', requestOptions).subscribe(
        (response) => {
          resolve(response);
          console.log(response);
        },
        (error) => {
          reject(error);
        }
      );
    });*/
  }

  sendSpeech(audio: string): void {
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

/*    const body = {
      'data-binary': audio
      // audio_file: audio
    };*/

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

  redirectToFunction(rep): void {
    if (rep.intents.length !== 0) {
      switch (rep.intents[0].name) {
        case 'temperature_set':
          console.log('Okay, I have to set the temperature');
          this.serviceTtoS.speak(this.speech, 'Okay, I have to set the temperature');

          // console.log('okay I change the temperature for ' + rep.entities.wit$temperature:temperature[0].value + 'degrees');
          // turn the temperature to 70 degrees
          break;

        case 'temperature_get':
        console.log('Okay, I have to get the temperature');
        this.serviceTtoS.speak(this.speech, 'Okay, I have to get the temperature');

        // console.log('okay I change the temperature for ' + rep.entities.wit$temperature:temperature[0].value + 'degrees');
        // turn the temperature to 70 degrees
        break;
        default:
          console.log('I didn\'t reconize your question');
          break;
      }
    }
  }
}
