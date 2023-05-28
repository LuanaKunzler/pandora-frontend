import { Component, OnInit } from '@angular/core';
import * as AuthActions from './store/authorization/authorization.actions';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAdminRoute: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAdminRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'admin';
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.CheckIfLoggedIn());
  }

  onActivate($event: any) {
    window.scroll(0, 0);
  }
}