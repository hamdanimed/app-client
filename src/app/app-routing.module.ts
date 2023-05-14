import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaiementSignatureComponent } from './paiement-signature/paiement-signature.component';
import { ListeImpayesComponent } from './liste-impayes/liste-impayes.component';
import { FormulaireCreanceComponent } from './formulaire-creance/formulaire-creance.component';
import { ListeCreancesComponent } from './liste-creances/liste-creances.component';
import { ListeCreanciersComponent } from './liste-creanciers/liste-creanciers.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OperationsComponent } from './operations/operations.component';

const routes: Routes=[
  // { path:'',pathMatch:'full',redirectTo:'paiement-signature' },
  { path:'',component:LoginPageComponent},
  { path:'home',component:HomeComponent},
  { path:'operations',component:OperationsComponent},
  { path:'liste-creanciers',component:ListeCreanciersComponent},
  { path:':creancier/liste-creances',component:ListeCreancesComponent},
  { path:':creancier/:creance',component:FormulaireCreanceComponent},
  { path:'liste-impayes',component:ListeImpayesComponent},
  { path:'paiement-validation',component:PaiementValidationComponent },
  { path:'paiement-signature',component:PaiementSignatureComponent },
  { path:'**', pathMatch: 'full', component: PagenotfoundComponent },

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
