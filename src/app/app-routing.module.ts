import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaiementValidationComponent } from './paiement-validation/paiement-validation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { ListeImpayesComponent } from './liste-impayes/liste-impayes.component';
import { FormulaireCreanceComponent } from './formulaire-creance/formulaire-creance.component';
import { ListeCreancesComponent } from './liste-creances/liste-creances.component';
import { ListeCreanciersComponent } from './liste-creanciers/liste-creanciers.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './guard/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordChangeGuard } from './guard/password-change.guard';

const routes: Routes=[
  { path:'',pathMatch:'full',redirectTo:'login' },
  { path:'login',component:LoginPageComponent},
  
<<<<<<< HEAD
  { path:'home',component:HomeComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path:'liste-creanciers',component:ListeCreanciersComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path:':creancier/liste-creances',component:ListeCreancesComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path:':creancier/:creance',component:FormulaireCreanceComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path:'liste-impayes',component:ListeImpayesComponent,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path:'paiement-validation',component:PaiementValidationComponent ,canActivate:[AuthGuard,PasswordChangeGuard]},
  { path:'change-password',component:ChangePasswordComponent ,canActivate:[AuthGuard]},
  { path:'**', pathMatch: 'full', component: PagenotfoundComponent,canActivate:[AuthGuard,PasswordChangeGuard] },
=======
  { path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  { path:'liste-creancier',component:ListeCreanciersComponent,canActivate:[AuthGuard]},
  { path:'liste-creance',component:ListeCreancesComponent,canActivate:[AuthGuard]},
  { path:'form',component:FormulaireCreanceComponent,canActivate:[AuthGuard]},
  { path:'liste-impayes',component:ListeImpayesComponent,canActivate:[AuthGuard]},
  { path:'paiement-validation',component:PaiementValidationComponent,canActivate:[AuthGuard]},
  { path:'**', pathMatch: 'full', component: PagenotfoundComponent,canActivate:[AuthGuard]},
>>>>>>> hamdani

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
