import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls : ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  nume: string;
  prenume: string;
  emailprimit: string;
  comentariu: string;
  formular: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  sendcontact()
  {
    this.formular = '{"nume":"' + this.nume +  '","prenume":"' + this.prenume +  '","comentariu":"' + this.comentariu +  '","email":"' + this.emailprimit + '"}' ;
    const json = JSON.stringify(this.formular);
    console.log(json);
    return this.http.post('https://medicationteam.herokuapp.com/medicamente/filter/backup', json,
      {responseType : 'text'}).
    subscribe(data => {console.log(data);  } );

    // this.http.post('http://localhost:4200/contact', this.formular).subscribe(data => console.log(data));
  }
  ngOnInit() {
  }
}
