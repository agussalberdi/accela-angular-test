import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UsersService } from './../../core/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.usersService.user
      .pipe(
          take(1),
          map((isLoggedIn) => {
          if (!isLoggedIn) {
              this.router.navigate(['login']);
              return false;
          }
          return true;
          })
      );
  }
}
