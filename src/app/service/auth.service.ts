import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginBody } from '../interfaces/LoginBody';
import { LoginResponse } from '../interfaces/LoginResponse';
import { JwtService } from './jwt/JwtService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DecodedToken } from '../interfaces/DecodedToken';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private jwtService:JwtService,private router:Router) { }
  isLoggedIn=false;
  isAuthenticated(){
    let token = localStorage.getItem("token")
    if(token===null) return false;
    return true
  }
  

  login(form:LoginBody){
    return this.http.post<LoginResponse>("https://jabak-lah-backend.onrender.com/client/auth/authenticate",form)
  }

  refreshLogin():Observable<HttpEvent<any>>{
    let refreshToken = localStorage.getItem('refreshToken')|| '';
    return this.http.post<HttpEvent<any>>("https://jabak-lah-backend.onrender.com/client/auth/refresh",{token:refreshToken})
    
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token')||''
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  setRefreshToken(refreshToken:string){
    localStorage.setItem('token',refreshToken)
  }
   getUsername(){
  
    let decodedToken:DecodedToken = jwtDecode(this.getToken())
    return decodedToken.sub
  }

  changePassword(body:LoginBody){
    this.http.post("https://jabak-lah-backend.onrender.com/client/auth/change-password",body,{
      headers:{
        Authorization:`Bearer ${this.getToken()}`
      }
    }).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigateByUrl("/home")
      } 
        
    )
  }
  getIsPasswordChanged():Observable<boolean>{
    let username = this.getUsername()
    return this.http.post<boolean>("https://jabak-lah-backend.onrender.com/client/auth/is-password-changed",{username:username},{
      headers:{
        Authorization:`Bearer ${this.getToken()}`
      }
    })
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    console.log("logout successful");
  }
}
