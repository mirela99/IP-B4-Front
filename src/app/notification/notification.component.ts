import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private result: Array<{}>;
  url = 'https://gooddiagnosis.azurewebsites.net/api/v1/detectionapi/get-notifications'

  constructor(private activeRoute: ActivatedRoute, private httpClient: HttpClient) { }
  public get results() {
    return this.result;

  }
  ngOnInit(): void {
    this.activeRoute.url.subscribe(url => {

      this.httpClient.post<any>(this.url, {"id": 1}).subscribe(data => {
        this.result = data;
        console.log(data);
      })
    });
    this.result = [
      {
        "category": "Waittt",
        "text": "Iti culegem notificarile",
        "links": []
      }
    ]
  };

/*
0"":
"age": 40
"amountOfMoney": 420
"contact": {"phone": "(977)-210-0075", "email": "duana.kristen@gmail.com"}
"disponibility": (3) ["Miercuri", "Joi", "Sâmbătă"]
"firstName": "Duana"
"gender": "femeie"
"id": "5eb990be4ee1fd2ce08e440d"
"lastName": "Kristen"
"rating": 5
"speciality": ["Neurologie"]
"workplaces": [{…}]


city: " Seattle"
country: "US"
hospitalName: "Lifecare General Hospital"
streetName: null
streetNo: 7
type: "privat"
*/


}

