import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageServer} from '../upload.service';

export interface Result{
  prob: number;
  result: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: Result;
  disease = 'Breast Cancer';
  URL = ImageServer.url;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('init');
    this.route
      .params
      .subscribe(value => {
        this.result = (value as Result);
        console.log(this.result);
      });
  }

}
