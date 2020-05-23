import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './question.service';
import { Message } from '../message';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const url = 'http://localhost:8090/questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  constructor(private questionService : QuestionService) { }

  messages : any;
  currentMessage = null;
  currentIndex = -1;
  openResponseForm = [];
  isDoctor = true;
  isPatient = false;

  private stompClient;
  responseContent = '';
  fromId = ''; // id utilizator logat
  fromName = '';// nume utilizator logat
  toId = '';
  messageType = 'response';

  responses : any;
  viewResponses;
  currentResponse = null;
  currentIndexResponse = -1;

  ngOnInit(): void {
    this.retrieveMessages();
  }

  retrieveMessages() {
    this.questionService.getUserMessages('1')
      .subscribe(
        data => {
          this.messages = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveResponsesToMessage(message) {
    this.questionService.getResponsesTo(message._id)
      .subscribe(
        data => {
          this.responses = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveMessage(message, index) {
    this.currentMessage = message;
    this.currentIndex = index;
    this.currentResponse = null;
    this.currentIndexResponse = -1;
    this.retrieveResponsesToMessage(message);
  }

  setActiveResponse(response, index){
    this.currentResponse = response;
    this.currentIndexResponse = index;
  }

  onClickOpenForm(index){
    if(this.openResponseForm[index] == true) {this.openResponseForm[index] = false;}
    else {this.openResponseForm[index] = true;}
  }

  onClickViewResponses(index,message){
    if(index == this.viewResponses) this.viewResponses = -1;
    else this.viewResponses= index;
  }

  sendMessageUsingRest(toMessage) {
    console.log("ai trimis un mesaj!");
    let message: Message = {content:this.responseContent, toId:toMessage.fromId, fromId:this.fromId,
                            fromName: this.fromName, messageType: this.messageType, responseTo:toMessage._id}
    this.questionService.post(message).subscribe(res => {
      console.log(res);
    })
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(url);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.openGlobalSocket()
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/queue", (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message){
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
    }
  }


}
