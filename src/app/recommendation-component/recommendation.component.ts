import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommendation-component',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponentComponent implements OnInit {
  private result: Array<{}>
  url = 'https://recommendation-team.herokuapp.com/api/v1/recommendation_list/';

  constructor(private activeRoute: ActivatedRoute, private httpClient: HttpClient) { }
  public get results() {
    return this.result;

  }
  ngOnInit(): void {
    this.activeRoute.url.subscribe(url => {
      const guid = url.pop()
      this.httpClient.get<any>(this.url + guid).subscribe(data => {
        this.result = data;
      })
    });
  };


}

