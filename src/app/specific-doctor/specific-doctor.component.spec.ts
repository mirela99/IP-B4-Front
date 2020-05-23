import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDoctorComponent } from './specific-doctor.component';

describe('SpecificDoctorComponent', () => {
  let component: SpecificDoctorComponent;
  let fixture: ComponentFixture<SpecificDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
