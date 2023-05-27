import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public dataService:DataService,private authService:AuthService,private router:Router){}

  redirectToCreancier(){
    this.router.navigate(['liste-creancier'])
  }
  
  submitLogout()
  {
    this.authService.logout()
    this.router.navigate(['liste-creancier'])
  }

}
