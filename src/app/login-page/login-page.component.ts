import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBody } from '../interfaces/LoginBody';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public router:Router,private authService:AuthService,private toastr:ToastrService){}

  ngOnInit(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['home'])
    }
  }

  submitLogin(){
    if(this.form.username==="" || this.form.password===""){
      this.toastr.warning("Champs manquants")
      return
    }
    console.log(this.form);
    // console.log(this.form);
    this.authService.login(this.form).subscribe(
      (data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken",data.refreshToken)
        this.router.navigateByUrl('/home')
      } ,
        
      (err:any) =>{
        console.log("login error");
        console.log(err.error.error);
        if(err.error.error && err.error.error==='Client not found'){
          this.toastr.warning(err.error.error)
        }
        else{
          this.toastr.warning("Erreur inconnue")
        }
  
      }
    )
  }

}
