import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main';
import {DespreComponent} from './despre';
import {ContactComponent} from './contact';
import {MedicamenteComponent} from './medicamente';
import {RecomandaremedComponent} from './recomandaremed';
import {RatingComponent} from './rating';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main' , component : MainComponent},
  {path: 'despre' , component: DespreComponent},
  {path: 'contact' , component: ContactComponent},
  {path: 'medicamente' , component: MedicamenteComponent},
  {path: 'recomandaremed' , component: RecomandaremedComponent },
  {path: 'rating' , component: RatingComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routesConstants = [MainComponent , DespreComponent, ContactComponent, MedicamenteComponent, RecomandaremedComponent, RatingComponent];
