import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8090/specialities';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  getByName(name){
    return this.http.get(baseUrl+'/name?name='+name);
  }
}
