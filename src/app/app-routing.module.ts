import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main';
import {DespreComponent} from './despre';
import {ContactComponent} from './contact';
import {MedicamenteComponent} from './medicamente';
import {RecomandaremedComponent} from './recomandaremed';
import {RatingComponent} from './rating';
import {FormComponentComponent} from './form-component/form.component';
import {RecommendationComponentComponent} from './recommendation-component/recommendation.component';
import {LoginComponent} from './login';
import {SelectionComponent} from './selection';
import {RegisterComponent} from './register';
import {RecuperareComponent} from './recuperare';
import {DoctorProfileCreationComponent} from './doctor-profile-creation';
import {PatientProfileCreationComponent} from './patient-profile-creation/patient-profile-creation.component';
import {OrarMedicComponent} from './orar-medic';
import {DoctorsComponent} from './doctors';
import {SpecializationComponent} from './specialization';
import {QuestionComponent} from './question';
import {SpecificDoctorComponent} from './specific-doctor/specific-doctor.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ImageFormComponent} from './imageForm/imageForm.component';
import {ResultComponent} from './result/result.component';
import {QuizComponent} from './quiz-component/quiz.component';
import {NotificationComponent} from './notification/notification.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main' , component : MainComponent},
  {path: 'about' , component: DespreComponent},
  {path: 'contact' , component: ContactComponent},
  {path: 'drugs' , component: MedicamenteComponent},
  {path: 'drugs-recommendation' , component: RecomandaremedComponent },
  {path: 'rating' , component: RatingComponent },
  { path: 'form', component: FormComponentComponent },
  { path: 'recommendation/:id', component: RecommendationComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'selection', component: SelectionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recuperare', component: RecuperareComponent },
  { path: 'profileCreation/:token', component: SelectionComponent },
  { path: 'doctorProfileCreation/:token', component: DoctorProfileCreationComponent },
  { path: 'patientProfileCreation/:token', component: PatientProfileCreationComponent },
  { path: 'orarDoctor/:token', component: OrarMedicComponent},
  { path: 'doctors', component: DoctorsComponent },
  {path: 'specialization', component: SpecializationComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'doctors/:id', component: SpecificDoctorComponent},
  {path: 'imageForm', component: ImageFormComponent},
  {path: 'result', component: ResultComponent},
  {path: 'quiz', component: QuizComponent },
  {path: 'notification', component: NotificationComponent },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routesConstants = [MainComponent , DespreComponent, ContactComponent, MedicamenteComponent,
  RecomandaremedComponent, RatingComponent, FormComponentComponent, RecommendationComponentComponent,
  PageNotFoundComponent , QuestionComponent, DoctorsComponent, SpecializationComponent, ImageFormComponent, ResultComponent, QuizComponent, NotificationComponent];
