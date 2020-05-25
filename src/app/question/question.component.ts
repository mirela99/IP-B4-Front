import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './question.service'
import { Message } from '../message'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const url = 'https://specialization-api.herokuapp.com/questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  constructor(private questionService : QuestionService) { }

  messages: any;
  currentMessage = null;
  currentIndex = -1;
  openResponseForm = [];
  isDoctor = false;
  isPatient = false;

  private stompClient;
  responseContent = '';
  fromId = ''; // id utilizator logat
  fromName = ''; // nume utilizator logat
  toId = '';
  messageType = 'response';

  responses : any;
  viewResponses;
  currentResponse = null;
  currentIndexResponse = -1;

  connectedUser = null;

  ngOnInit(): void {

    this.connectedUser = JSON.parse(localStorage.getItem('username'));
    console.log(this.connectedUser._id);
    this.setUserInfo(this.connectedUser);
    this.retrieveMessages();
  }

  Doctor(){
    this.isDoctor = true;
    this.isPatient = false;
  }

  Patient(){
    this.isDoctor = false;
    this.isPatient = true;
  }

  Guest(){
    this.isDoctor = false;
    this.isPatient = false;
  }

  setUserInfo(user){
    if(user == null){
      this.Guest();
    }
    else {
      if(user.type == 'doctor'){
        this.Doctor();
      }
      if(user.type == 'patient'){
        this.Patient();
      }
      this.fromId = user._id;
      this.fromName = user.name.concat(user.surname.toString());
  }
  }

  retrieveMessages() {
    this.questionService.getUserMessages(this.connectedUser._id)
      .subscribe(
        data => {
          this.messages = data;
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
    let message: Message = {content:this.responseContent, toId:toMessage.fromId, fromId:this.fromId, 
                            fromName: this.fromName, messageType: this.messageType, responseTo:toMessage._id}
    this.questionService.post(message).subscribe(res => {
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
      this.messages.push(messageResult);
    }
  }


}
