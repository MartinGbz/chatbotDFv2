import { Component, OnInit } from '@angular/core';
import {ChatbotService} from '../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  msg = null;

  constructor(public serv: ChatbotService) { }

  ngOnInit(): void {
  }

  send(): void{
    console.log(this.msg);
    this.serv.sendMessage(this.msg);
  }

}
