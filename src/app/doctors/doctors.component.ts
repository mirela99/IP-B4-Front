import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {DoctorService} from './doctor.service'

@Component({
  selector: 'app-doctors',
  templateUrl: 'doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any;
  currentDoctor = null;
  currentIndex = -1;
  name = '';
  specialitate= '';
  locatie = '';
  filterList = '';
  sortare = '';
  sortDirectie = '';

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.retrieveDoctors();
  }


  retrieveDoctors() {
    this.doctorService.getAll()
      .subscribe(
        data => {
          this.doctors = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveDoctor(doctor, index) {
    this.currentDoctor = doctor;
    this.currentIndex = index;
  }

  filterDoctors(){
    if(this.sortare =='Nume ( A - Z )'){
      this.sortare = 'name';
      this.sortDirectie = 'Asc';
    }
    if(this.sortare =='Nume ( Z - A )'){
      this.sortare = 'name';
      this.sortDirectie = 'Desc'
    }
    if(this.sortare =='Rating crescator'){
      this.sortare = 'rating';
      this.sortDirectie = 'Asc';
    }
    if(this.sortare =='Rating descrescator'){
      this.sortare = 'rating';
      this.sortDirectie = 'Desc';
    }
    this.filterList = '?name='+this.name+'&speciality='+
    this.specialitate+'&workplace.city='+this.locatie+'&sortBy='+this.sortare+'&sortDirection='+this.sortDirectie;
    //console.log(this.specialitate);
    this.doctorService.searchDoctor(this.filterList)
      .subscribe(
        data => {
          this.doctors = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  

}
