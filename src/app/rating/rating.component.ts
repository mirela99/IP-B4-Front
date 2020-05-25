import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css' ]
})
export class RatingComponent implements OnInit{
  currentRate = 6;
  text1: string;
  comentariuSpatiu: FormGroup;
  feedback: string;
  ngOnInit(): void {
this.comentariuSpatiu = this.formBuilder.group({comentariu:[this.text1]});
  }
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }
  trimiteComentariu(){
    alert("S-a intregistrat feedback-ul, va multumim!");
    console.log(this.text1 , this.currentRate);
    this.feedback = '{"stelute":"' + this.currentRate + '","comentariu":"'
                      + this.text1 + '"}' ;
    const json = JSON.stringify(this.feedback);
    console.log(json);
    return this.httpClient.post('https://medicationteam.herokuapp.com/feedback/stelute', json,
     {responseType : 'text'}).
    subscribe(data => {console.log(data);  } );
    
  }

}

