import { Component, OnInit } from '@angular/core';
import { SpecializationService } from './specialization.service';

@Component({
  selector: 'app-specialization',
  templateUrl: 'specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {
  allSpecializations: any;
  specializations: any;
  currentSpec = null;
  currentIndex = -1;
  name = '';
  sortare = '';
  sortDirectie = '';
  filterList = '';

  constructor(private specializationService: SpecializationService) { }

  ngOnInit(): void {
    this.retrieveSpecialization();
  }

  retrieveSpecialization() {
    this.specializationService.getAll()
      .subscribe(
        data => {
          this.specializations = data;
          this.allSpecializations = data;
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

  filterSpecs(){
      if (this.sortare == 'Nume ( A - Z )'){
          this.sortDirectie = 'ASC';
      }
      if (this.sortare == 'Nume ( Z - A )'){
          this.sortDirectie = 'DESC';
      }
      this.filterList = '?sortDirection=' + this.sortDirectie;

      this.specializationService.getSortedSpecs(this.filterList)
          .subscribe(
              data => {
                  this.specializations = data;
                  console.log(data);
                  },
              error => {
                  console.log(error);
                });
  }

}