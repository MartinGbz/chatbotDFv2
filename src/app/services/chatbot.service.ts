import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GlobalVariables } from '../global.variables';
import {Injectable} from '@angular/core';


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

@Injectable({ providedIn: 'root' })

export class ChatbotService {

  constructor(private http: HttpClient) {
  }
    /*
    sendMessage(msg: string): any {
      console.log(msg);
      // const body: RequestChatbot = { {{text: msg}, languageCode: "en" }, {timeZone: ""}};
      // const body = {} as RequestChatbot;
      /!*    console.log(body);
          body.queryInput.text.text = msg;
          body.queryInput.languageCode = 'en';
          body.queryParams.timeZone = 'Europe/Madrid';*!/

      // tslint:disable-next-line:max-line-length
      // const body = JSON.parse('{ "queryInput":{"text":{"text": \"' + msg + '\"}, "languageCode": "en" }, "queryParams":{"timeZone": "Europe/Madrid" }');

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
          + GlobalVariables.SESSION_ID + ':detectIntent?alt=json&key=', body).subscribe(
          (response) => {
            resolve(response);
            console.log(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
    */

  sendMessage(msg: string): any {

    const headerDict = {
      Authorization: 'Bearer ' + GlobalVariables.ACCESS_TOKEN_WIT
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };


    this.http.get('https://api.wit.ai/message?v=20210512&q=turn%20the%20temperature%20to%2070%20degrees', requestOptions).subscribe(
      (reponse: any) => {
        console.log('reponse:');
        console.log(reponse);
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
}
