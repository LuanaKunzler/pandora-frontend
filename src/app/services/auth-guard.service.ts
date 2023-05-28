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
          if (!authState.authenticated) {
            this.router.navigate(['/login']);
            return false;
          }
  
          if (authState.userRole.includes('ROLE_ADMIN')) {
            // Usuários com ROLE_ADMIN têm acesso à rota /admin
            return true;
          }
  
          if (state.url.startsWith('/admin')) {
            // Usuários sem ROLE_ADMIN tentando acessar a rota /admin são redirecionados para a rota padrão
            this.router.navigate(['/']);
            return false;
          }
  
          return true;
        })
      );
  }
  
}
