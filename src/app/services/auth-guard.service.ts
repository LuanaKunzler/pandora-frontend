import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../store/authorization/authorization.reducer';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('authorization')
      .pipe(
        take(1),
        map((authState: fromAuth.AuthorizationState) => {
          if (!authState.authenticated || !authState.userRole.includes('ROLE_ADMIN')) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        })
      );
  }
}
