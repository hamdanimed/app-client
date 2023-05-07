import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes=[
  { path:'',pathMatch:'full',redirectTo:'paiement-validation' },
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
