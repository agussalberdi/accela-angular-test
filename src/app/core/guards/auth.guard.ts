import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UsersService } from '@core/services/users.service';


/**
 * @desc This guard prevent users from accessing areas that they’re not allowed to access.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  /**
   * @desc Checks to see if a user can visit a route.
   * @returns Boolean
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.usersService.user
      .pipe(
          take(1),
          map((user) => {
          if (!user) {
              this.router.navigate(['login']);
              return false;
          }
          return true;
          })
      );
  }
}
