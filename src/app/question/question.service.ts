import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../message';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const baseUrl = 'http://localhost:8090/message';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getUserMessages(userId){
    return this.http.get(baseUrl+'/'+userId);
  }

  getResponsesTo(messageId){
    return this.http.get(baseUrl + '/response/' + messageId);
  }

  post(data: Message) {
    return this.http.post(baseUrl, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }
}
