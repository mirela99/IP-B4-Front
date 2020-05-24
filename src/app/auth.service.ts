import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://auth-service-ip.herokuapp.com';
  }

  private get(uri: string){
    return this.http.get(this.ROOT_URL + '/' + uri);
   }

  keepLoggedIn(username: string){
          localStorage.setItem('username', username);
          console.log(localStorage.getItem('username'));
  }
}
