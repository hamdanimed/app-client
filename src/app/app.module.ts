import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaiementSignatureComponent } from './paiement-signature/paiement-signature.component';
import { FormulaireCreanceComponent } from './formulaire-creance/formulaire-creance.component';
import { ListeImpayesComponent } from './liste-impayes/liste-impayes.component';


@NgModule({
  declarations: [
    AppComponent,
    PaiementValidationComponent,
    PagenotfoundComponent,
    PaiementSignatureComponent,
    FormulaireCreanceComponent,
    ListeImpayesComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
