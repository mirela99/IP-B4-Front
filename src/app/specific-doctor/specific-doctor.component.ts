import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location } from '@angular/common';
import {DoctorService} from '../doctors/doctor.service';
import {ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Message } from '../message'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { QuestionService } from '../question/question.service'

const urlToSendMesssage = 'https://specialization-api.herokuapp.com/questions'

@Component({
  selector: 'app-specific-doctor',
  templateUrl: './specific-doctor.component.html',
  styleUrls: ['./specific-doctor.component.css']
})
export class SpecificDoctorComponent implements OnInit {
  currentDoctor = null;
  message = '';
  questionContent = '';
  isDoctor = false; 
  isPatient = false;
  connectedUser = null;
  fromId = ''; //utilizatorul logat
  fromName ='';//utilizatorul logat
  messageType = 'question';
  messages: Message[] = [];
  private stompClient;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private doctorService: DoctorService,
      private questionService: QuestionService
  ){}

  getDoctor(id) {
    this.doctorService.get(id)
        .subscribe(
            data => {
              this.currentDoctor = data;
            },
            error => {
              console.log(error);
            });
  }

  ngOnInit(): void {
    this.message = '';
    this.getDoctor(this.activatedRoute.snapshot.paramMap.get('id'));
    this.connectedUser = JSON.parse(localStorage.getItem('username'));
    this.setUserInfo(this.connectedUser);
    this.initializeWebSocketConnection();
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
      this.Patient();
      this.fromId = user._id;
      this.fromName = user.name.concat(user.surname.toString());
  }
  }

  sendMessageUsingRest() {
    let message: Message = {content:this.questionContent, toId:this.activatedRoute.snapshot.paramMap.get('id'), fromId:this.fromId, 
                            fromName: this.fromName, messageType: this.messageType, responseTo:''}
    this.questionService.post(message).subscribe(res => {
    })
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(urlToSendMesssage);
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
