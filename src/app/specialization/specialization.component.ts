import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SpecializationService } from './specialization.service'

@Component({
  selector: 'app-specialization',
  templateUrl: 'specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {

  specializations: any;
  currentSpec = null;
  currentIndex = -1;
  name = '';

  constructor(private specializationService : SpecializationService) { }

  ngOnInit(): void {
    this.retrieveSpecialization();
  }

  retrieveSpecialization() {
    this.specializationService.getAll()
      .subscribe(
        data => {
          this.specializations = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchSpec(){
    this.specializationService.getByName(this.name)
      .subscribe(
        data => {
          this.specializations = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveSpec(specialization, index) {
    this.currentSpec = specialization;
    this.currentIndex = index;
  }

}