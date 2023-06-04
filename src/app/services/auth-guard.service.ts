import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../store/authorization/authorization.reducer';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('authorization').pipe(
      take(1),
      map((authState: fromAuth.AuthorizationState) => {
        console.log('authGuard authState.role: ', authState.userRole);

        if (!authState.authenticated) {
          this.router.navigate(['/login']);
          return false;
        } else if (
          authState.userRole.includes('ROLE_ADMIN') &&
          state.url === '/admin'
        ) {
          // O usuário tem a role ROLE_ADMIN e está na rota /admin, permita o acesso
          return true;
        } else if (
          authState.userRole.includes('ROLE_USER') &&
          state.url !== '/admin'
        ) {
          // O usuário tem a role ROLE_USER e não está na rota /admin, permita o acesso
          return true;
        } else {
          // Para qualquer outro caso, redirecione de volta para a rota /admin
          this.router.navigate(['/admin']);
          return false;
        }
      })
    );
  }
}
