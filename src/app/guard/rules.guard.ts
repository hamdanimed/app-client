import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RulesGuard implements CanActivate {
  constructor(private router:Router,private dataService:DataService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  
  {
    if(this.dataService.selectedCreancier && this.dataService.selectedCreancier.code==="no-creance"){
      
      this.router.navigate([''])
    }
    return true;
  }
  
}
