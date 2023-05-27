import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { JwtService } from '../service/jwt/JwtService';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataService:DataService,private jwtService:JwtService,private authService: AuthService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn){
      if(localStorage.getItem('token') !== null){
        let clientTel=this.jwtService.decodeToken(localStorage.getItem('token')!).sub;
        //if we already have the client object
        if(this.dataService.client){
          console.log('we already have the client object')
          //if the client in the data service is different than the one logged in, get the new client object
          if(this.dataService.client.tel !== clientTel){
            console.log('the client we have in the data service is different than the one logged in')
            this.dataService.getClient(clientTel).subscribe(client=>{
              this.dataService.client=client
            })
          }
        }else{ //if we dont have the client object 
          console.log('we dont have the client object')
          this.dataService.getClient(clientTel).subscribe(client=>{
            this.dataService.client=client
          })
        }
      }
      return true
    } else {
      this.router.navigate(['/']);
      return false;
    }
  
  }

}