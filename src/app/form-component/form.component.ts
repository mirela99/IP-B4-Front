
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { HttpClient, HttpResponse } from '@angular/common/http'
interface Choice {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentComponent implements OnInit {

  totalAngularPackages;
  isLinear = true;
  symptomsForm: FormGroup;
  detailsForm: FormGroup;
  infoForm: FormGroup;
  sliderValue: number;
  response: Object[];
  options: string[];
  chosenZoneOptions: string[];
  zoneOptions: Object;
  filteredOptions: string[];
  filteredSecondOptions: string[];
  route: ActivatedRoute;
  maxDate: Date;
  url = 'https://recommendation-team.herokuapp.com/api/v1/recommendation';

  jsonObject = {
    simptoms: {
      bodyPart: '',
      simptomType: '',
      sick: false,
      lastControlDate: ''
    },
    info: {
      sameAddress: true,
      actualAdress: '',
      medic: '',
      clinic: '',
      priceLimit: 0
    }
  }


  choices: Choice[] = [
    { value: 'da', viewValue: 'Da' },
    { value: 'nu', viewValue: 'Nu' }
  ];


  choicesThirdStep: Choice[] = [
    { value: 'da', viewValue: 'Da' },
    { value: 'nu', viewValue: 'Nu' }
  ];



  anotherchoices: Choice[] = [
    { value: 'barbat', viewValue: 'Bărbat' },
    { value: 'femeie', viewValue: 'Femeie' }
  ];


  thirdchoices: Choice[] = [
    { value: 'privat', viewValue: 'Privat' },
    { value: 'stat', viewValue: 'De stat' }
  ];

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.maxDate = new Date();
  }

  loading = true;
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
  goToItems() {
    this.router.navigate(['items'], { relativeTo: this.route });
  }

  notAdress(): ValidatorFn {
    return (form: FormComponentComponent["infoForm"]): ValidationErrors | null => {

      let checked = form.controls.locationControl.value;
      let second = form.controls.newLocationControl.value;
      if (checked == "nu" && !second) {
        return {
          'err': true
        };
      }
      return null;
    }
  }

  ngOnInit() {
    this.getSimptoms()
    this.symptomsForm = this._formBuilder.group({
      bodyPartControl: [''],
      simptomTypeControl: ['', Validators.required],
      chronicDeseaseControl: ['', Validators.required],
      lastDateControl: ['', Validators.required],
    });
    this.infoForm = this._formBuilder.group({
      locationControl: ['', Validators.required],
      newLocationControl: [''],
      medicControl: ['', Validators.required],
      clinicControl: ['', Validators.required]
    }, { validators: this.notAdress() })

    this.symptomsForm.controls.bodyPartControl.valueChanges.subscribe(() => {
      this.symptomsForm.controls.simptomTypeControl.reset();
    });
  }


  getValuesStepOne() {

    this.jsonObject.simptoms.bodyPart = this.symptomsForm.controls.bodyPartControl.value;
    this.jsonObject.simptoms.simptomType = this.symptomsForm.controls.simptomTypeControl.value;
    if (this.symptomsForm.controls.chronicDeseaseControl.value === 'da')
      this.jsonObject.simptoms.sick = true;
    this.jsonObject.simptoms.lastControlDate = this.symptomsForm.controls.lastDateControl.value;

  }


  formatLabel(sliderValue: number) {
    if (sliderValue >= 10) {
      return Math.round(sliderValue / 10);
    }
    return sliderValue;
  }

  public bigTool: Object = { isVisible: true, format: '#####' };

  updateValue(event) {
    this.sliderValue = event.value;
  }

  getCurrentInfo() {
    if (this.infoForm.controls.locationControl.value === 'nu')
      this.jsonObject.info.sameAddress = false;
    this.jsonObject.info.actualAdress = this.infoForm.controls.newLocationControl.value;
    this.jsonObject.info.medic = this.infoForm.controls.medicControl.value;
    this.jsonObject.info.clinic = this.infoForm.controls.clinicControl.value;
    this.jsonObject.info.priceLimit = this.sliderValue;
  }

  private getSimptoms() {
    this.http.get<any>(this.url).subscribe(data => {
      this.setOptions(data[0].options);
      this.zoneOptions = data[0];
      this.filteredOptions = data[0]["options"];
    })

  }

  public get symptoms() {
    return this.zoneOptions[this.symptomsForm.controls.bodyPartControl.value];
  }



  setOptions(vector) {
    this.options = vector;
  }
  sendJson() {
    this.http.post<any>(this.url, { simptoms: this.jsonObject.simptoms, info: this.jsonObject.info })
      .subscribe((response) => {
        const guid: string = response['guid'];
        this.router.navigate(["recommendation", guid]);
      });
  }
}
