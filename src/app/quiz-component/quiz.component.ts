
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
interface Choice {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  url = 'https://gooddiagnosis.azurewebsites.net/api/v1/detectionapi/get-question';
  url2 = 'https://gooddiagnosis.azurewebsites.net/api/v1/detectionapi/send-response';
  private result: {}
  public id;
  public status;


  constructor(private activeRoute: ActivatedRoute, private httpClient: HttpClient) {

  }
  public get results() {
    return this.result;

  }

  setStatusFromEvent(event) {
    console.log(event);
    this.status = event.target.value;
  }

  setStatus(status) {
    this.status = status;
  }

  sendResponse() {
    if(this.status !== undefined) {
      this.httpClient.post<any>(this.url2, {"id": this.id, "status": this.status}).subscribe(data => {
        this.result = data;
        console.log(data);
      })
    }
    else {
      console.log("Please write some data");
    }
  }

  ngOnInit() {
    this.id = Math.floor(Math.random() * 100) + 1;
    this.httpClient.post<any>(this.url, {"id": this.id}).subscribe(data => {
      this.result = data;
      console.log(data);
    })
  }


  public bigTool: Object = { isVisible: true, format: '#####' };



}
