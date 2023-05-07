import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaiementSignatureComponent } from './paiement-signature/paiement-signature.component';

const routes: Routes=[
  { path:'',pathMatch:'full',redirectTo:'paiement-signature' },
  { path:'paiement-validation',component:PaiementValidationComponent },
  { path:'paiement-signature',component:PaiementSignatureComponent },
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
