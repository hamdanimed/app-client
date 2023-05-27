import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) {
  }
  canActivate(): Observable<boolean> {
    return this.auth.getIsPasswordChanged().pipe(
      map((result:boolean) => {
        if (!result) {
          this.router.navigate(['/change-password']);
        }
        return result;
      })
    );
    //  || this.router.navigateByUrl('/change-password')
  }
  
  
}
