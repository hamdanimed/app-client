import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  ToastNoAnimationModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormulaireCreanceComponent } from './formulaire-creance/formulaire-creance.component';
import { ListeImpayesComponent } from './liste-impayes/liste-impayes.component';
import { ListeCreancesComponent } from './liste-creances/liste-creances.component';
import { ListeCreanciersComponent } from './liste-creanciers/liste-creanciers.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    PaiementValidationComponent,
    PagenotfoundComponent,
    FormulaireCreanceComponent,
    ListeImpayesComponent,
    ListeCreancesComponent,
    ListeCreanciersComponent,
    HomeComponent,
    LoginPageComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastNoAnimationModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
