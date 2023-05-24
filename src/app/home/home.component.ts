import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService:AuthService,private router:Router){}

  redirectToCreancier(){
    this.router.navigate(['liste-creancier'])
  }
  
  submitLogout()
  {
    this.authService.logout()
    this.router.navigate(['liste-creancier'])
  }

}
