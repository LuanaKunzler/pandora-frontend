import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as AuthorizationActions from './authorization.actions';
import * as CartActions from '../cart/cart.actions';
import * as OrderActions from '../order/order.actions';
import * as ShowcaseActions from '../showcase/showcase.actions';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SignIn } from './authorization.actions';
import { GoogleRegisterUserRequest, GoogleSignInRequest } from '../model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  // @Effect()
  // signUp = this.actions$.pipe(
  //   ofType<AuthorizationActions.SignUp>(AuthorizationActions.SIGN_UP),
  //   map((action) => action.payload),
  //   switchMap((credentials) =>
  //     this.accountService
  //       .createAccount(
  //         credentials.email,
  //         credentials.password,
  //         credentials.passwordRepeat
  //       )
  //       .pipe(
  //         switchMap((res) => [
  //           {
  //             type: AuthorizationActions.SIGN_UP_SUCCESS,
  //             payload: { effect: AuthorizationActions.SIGN_UP },
  //           },
  //           new AuthorizationActions.SignIn({
  //             email: res.email,
  //             password: res.password,
  //           }),
  //         ]),
  //         catchError((error) =>
  //           of(
  //             new AuthorizationActions.AuthError({
  //               error,
  //               errorEffect: AuthorizationActions.SIGN_UP,
  //             })
  //           )
  //         )
  //       )
  //   )
  // );

  @Effect()
  signUp = this.actions$.pipe(
    ofType(AuthorizationActions.SIGN_UP),
    map((action: AuthorizationActions.SignUp) => {
      return action.payload;
    }),
    switchMap(
      (credentials: {
        email: string;
        password: string;
        passwordRepeat: string;
      }) => {
        return this.accountService
          .createAccount(
            credentials.email,
            credentials.password,
            credentials.passwordRepeat
          )
          .pipe(
            switchMap((res) => {
              return [
                {
                  type: AuthorizationActions.SIGN_UP_SUCCESS,
                  payload: { effect: AuthorizationActions.SIGN_UP },
                },
                {
                  type: AuthorizationActions.SIGN_IN, // Login automático
                  payload: {
                    email: credentials.email,
                    password: credentials.password,
                  },
                },
              ];
            }),
            catchError((error) =>
              of(
                new AuthorizationActions.AuthError({
                  error,
                  errorEffect: AuthorizationActions.SIGN_UP,
                })
              )
            )
          );
      }
    )
  );

  @Effect()
  signIn = this.actions$.pipe(
    ofType(AuthorizationActions.SIGN_IN),
    map((action: AuthorizationActions.SignIn) => {
      return action.payload;
    }),
    switchMap((credentials: { email: string; password: string }) => {
      return this.tokenService
        .obtainAccessToken(credentials.email, credentials.password)
        .pipe(
          tap((res) => console.log('Resposta do obtainAccessToken:', res)),
          switchMap((res) => {
            this.tokenService.saveToken(res);
            this.router.navigate(['/']);
            return [
              {
                type: AuthorizationActions.SIGN_IN_SUCCESS,
                payload: { effect: AuthorizationActions.SIGN_IN },
              },
              { type: AuthorizationActions.FETCH_VERIFICATION_STATUS },
            ];
          }),
          catchError((error) =>
            of(
              new AuthorizationActions.AuthError({
                error,
                errorEffect: AuthorizationActions.SIGN_IN,
              })
            )
          )
        );
    })
  );

  @Effect()
  signOut = this.actions$.pipe(
    ofType(AuthorizationActions.SIGN_OUT),
    concatMap((action: AuthorizationActions.SignOut) => {
      this.tokenService.removeToken();
      return [
        {
          type: AuthorizationActions.SIGN_OUT_SUCCESS,
        },
        {
          type: CartActions.EMPTY_CART_SUCCESS,
        },
        {
          type: OrderActions.EMPTY_ORDER,
        },
        {
          type: ShowcaseActions.EMPTY_INTERESTED,
        },
      ];
    })
  );

  @Effect()
  checkIfLoggedIn = this.actions$.pipe(
    ofType(AuthorizationActions.CHECK_IF_LOGGED_IN),
    switchMap((action: AuthorizationActions.CheckIfLoggedIn) => {
      if (this.tokenService.checkIfTokenExists()) {
        return [
          {
            type: AuthorizationActions.SIGN_IN_SUCCESS,
            payload: { effect: AuthorizationActions.SIGN_IN_SUCCESS },
          },
          {
            type: AuthorizationActions.FETCH_VERIFICATION_STATUS,
          },
        ];
      }
      return [
        {
          type: AuthorizationActions.SIGN_OUT_SUCCESS,
          payload: { effect: AuthorizationActions.SIGN_OUT },
        },
      ];
    })
  );

  @Effect()
  fetchVerificationStatus = this.actions$.pipe(
    ofType(AuthorizationActions.FETCH_VERIFICATION_STATUS),
    switchMap((action: AuthorizationActions.FetchVerificationStatus) => {
      return this.accountService.getVerificationStatus().pipe(
        map((res) => {
          return {
            type: AuthorizationActions.FETCH_VERIFICATION_STATUS_SUCCESS,
            payload: res,
          };
        }),
        catchError((error) => of(new AuthorizationActions.SignOut()))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private tokenService: TokenService,
    private router: Router,
    private accountService: AccountService
  ) {}

  // @Effect()
  // googleSignUp$ = this.actions$.pipe(
  //   ofType(AuthorizationActions.GOOGLE_SIGN_UP),
  //   map((action: AuthorizationActions.GoogleSignUp) => action.payload),
  //   switchMap(
  //     (payload: {
  //       token: string;
  //       googleRegisterUserRequest: GoogleRegisterUserRequest;
  //     }) => {
  //       return this.accountService
  //         .signUpWithGoogle(payload.token, payload.googleRegisterUserRequest)
  //         .pipe(
  //           switchMap((res) => {
  //             this.tokenService.saveToken(res.accessToken);
  //             const googleSignInRequest: GoogleSignInRequest = {
  //               email: res.email,
  //               providerId: res.providerId,
  //               provider: 'GOOGLE',
  //             };
  //             return of(
  //               new AuthorizationActions.GoogleSignIn({ googleSignInRequest })
  //             );
  //           }),
  //           catchError((error) =>
  //             of(
  //               new AuthorizationActions.AuthError({
  //                 error,
  //                 errorEffect: AuthorizationActions.GOOGLE_SIGN_UP,
  //               })
  //             )
  //           )
  //         );
  //     }
  //   )
  // );

  @Effect()
  googleSignIn$ = this.actions$.pipe(
    ofType(AuthorizationActions.GOOGLE_SIGN_IN),
    map(
      (action: AuthorizationActions.GoogleSignIn) =>
        action.payload.googleSignInRequest
    ),
    switchMap(
      (googleSignInRequest: {
        email: string;
        providerId: string;
        provider: string;
        idToken: string;
      }) =>
        this.accountService.signInWithGoogle(googleSignInRequest).pipe(
          switchMap((response: { token: string }) => {
            this.tokenService.saveToken(response.token);
            this.router.navigate(['/']);
            return [
              {
                type: AuthorizationActions.GOOGLE_SIGN_IN_SUCCESS,
                payload: { effect: AuthorizationActions.GOOGLE_SIGN_IN },
              },
              { type: AuthorizationActions.FETCH_VERIFICATION_STATUS },
            ];
          }),
          catchError((error) =>
            of(
              new AuthorizationActions.AuthError({
                error,
                errorEffect: AuthorizationActions.GOOGLE_SIGN_IN,
              })
            )
          )
        )
    )
  );
}
