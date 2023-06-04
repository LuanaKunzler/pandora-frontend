import { Component, OnInit } from '@angular/core';
import * as AuthActions from './store/authorization/authorization.actions';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import { NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAdminRoute: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.CheckIfLoggedIn());
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin');
      }
    });
  }

  

  onActivate($event: any) {
    window.scroll(0, 0);
  }
}