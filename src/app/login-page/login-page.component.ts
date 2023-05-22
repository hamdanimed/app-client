import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody } from '../interfaces/LoginBody';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  form:LoginBody = {
    username:"",
    password:""
  }

  constructor(public router:Router,private authService:AuthService){}

  submitLogin(){
    console.log(this.form);
    // console.log(this.form);
    this.authService.login(this.form)
  }

}
