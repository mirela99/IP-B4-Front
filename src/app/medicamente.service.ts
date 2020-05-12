import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicamenteService  {
  constructor(private httpClient: HttpClient) {
  }

  baseUrl: 'https://medicationteam.herokuapp.com/medicamente/filter';

  /*searchinit(obj) {
    console.log('Intra in search');
    return this.httpClient.post(this.baseUrl, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       /* 'Access-Control-Allow-Origin': 'http://localhost:4200', // -->Add this line
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Request-Method': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': '*',*/
        'Accept': 'application/json'
    /*  })
    }) ;
  }*/
}

