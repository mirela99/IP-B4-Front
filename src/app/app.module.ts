import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, enableProdMode, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppRoutingModule, routesConstants} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MiddlePicturesComponent } from './middle-pictures/middle-pictures.component';
import { BoxesComponent } from './boxes/boxes.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NgImageSliderModule } from 'ng-image-slider';
import {DespreComponent} from './despre';
import {MainComponent} from './main';
import {MatTabsModule} from '@angular/material/tabs';
import {ContactComponent} from './contact';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MedicamenteComponent} from './medicamente';
import {RecomandaremedComponent} from './recomandaremed';
import {RatingComponent} from './rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainNavComponent } from './main-nav/main-nav.component';
import {FormComponentComponent} from './form-component/form.component';
import {RecommendationComponentComponent} from './recommendation-component/recommendation.component';
import {LoginComponent} from './login';
import { fakeBackendProvider } from './_helpers';
import { MDBBootstrapModule, ButtonsModule, WavesModule, CollapseModule, InputsModule } from 'angular-bootstrap-md';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { RegisterComponent } from './register';
import { RecuperareComponent } from './recuperare'
import { AlertComponent } from './_components';;
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider , GoogleLoginProvider } from 'angularx-social-login';;
import { PatientProfileCreationComponent } from './patient-profile-creation/patient-profile-creation.component';
import { DoctorProfileCreationComponent } from './doctor-profile-creation';
import { SelectionComponent } from './selection';
import { OrarMedicComponent } from './orar-medic';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {SpecificDoctorComponent} from './specific-doctor/specific-doctor.component';
import {ImageFormComponent} from './imageForm';
import {ResultComponent} from './result/result.component';
import {QuizComponent} from './quiz-component/quiz.component';
import {NotificationComponent} from './notification/notification.component';

const config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('977157414816-vk4g6l7cjhcgnjqf24d8lqn63jjf2g98.apps.googleusercontent.com')

},
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('265582661268875')
  }]);
export function provideConfig(){
  return config;
}


enableProdMode();
@NgModule({
  declarations: [
    ResultComponent,
    ImageFormComponent,
    LoginComponent,
    FormComponentComponent,
    RecommendationComponentComponent,
    AppComponent,
    FooterComponent,
    MiddlePicturesComponent,
    BoxesComponent,
    MenuBarComponent,
    DespreComponent,
    MainComponent,
    ContactComponent,
    MedicamenteComponent,
    RecomandaremedComponent,
    RatingComponent,
    MainNavComponent,
    routesConstants,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    RecuperareComponent,
    AlertComponent,
    PatientProfileCreationComponent,
    DoctorProfileCreationComponent,
    SelectionComponent,
    OrarMedicComponent,
    SpecificDoctorComponent,
    QuizComponent,
    NotificationComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FlexLayoutModule,
    ButtonsModule,
    WavesModule,
    CollapseModule,
    InputsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgbModule,
    BrowserModule,
    MatTabsModule,
    NgImageSliderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    BrowserModule,
    MatSliderModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    PortalModule,
    ScrollingModule,

    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    MatRippleModule,

    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,

    MatTooltipModule,
    MatTreeModule,
    FlexLayoutModule,
    NgbModule
  ],
   providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig },
    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent,
    MedicamenteComponent, ContactComponent, RatingComponent ],
  entryComponents: [MedicamenteComponent, ContactComponent, RatingComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
