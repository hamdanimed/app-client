import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ListeCreancesComponent } from './liste-creances/liste-creances.component';
import { ListeCreanciersComponent } from './liste-creanciers/liste-creanciers.component';

const routes: Routes=[
  { path:'',pathMatch:'full',redirectTo:'paiement-validation' },
  {path : 'liste-creances',component:ListeCreancesComponent},
  {path : 'liste-creanciers',component:ListeCreanciersComponent},
  { path:'paiement-validation',component:PaiementValidationComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }
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
