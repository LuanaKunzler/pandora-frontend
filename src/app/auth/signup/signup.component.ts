import { AuthorizationState } from './../../store/authorization/authorization.reducer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../store/authorization/authorization.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as PasswordValidators from '../../../utils//validators/password.validator';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  GoogleSignUpFailure,
  GoogleSignUpSuccess,
  SignUp,
} from '../../store/authorization/authorization.actions';
import { HttpError } from '../../store/app.reducers';
import { AccountService } from 'src/app/services/account.service';
import { GoogleRegisterUserRequest } from 'src/app/store/model';
import { ErrorMessage } from 'src/app/common/error-message';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { MyHttpError } from 'src/app/common/myHttpError';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup | any;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  authorizationState: Observable<AuthorizationState> =
    new Observable<AuthorizationState>();

  constructor(
    private store: Store<fromApp.AppState>,
    private afAuth: AngularFireAuth,
    private accountService: AccountService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      passwordGroup: new FormGroup(
        {
          newPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(52),
          ]),
          newPasswordConfirm: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(52),
          ]),
        },
        PasswordValidators.passwordMatchCheckValidator.bind(this)
      ),
    });

    this.authorizationState = this.store.select('authorization');
  }

  onRegistered() {
    this.store.dispatch(
      new AuthActions.SignUp({
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.passwordGroup.newPassword,
        passwordRepeat: this.signUpForm.value.passwordGroup.newPasswordConfirm,
      })
    );
  }

  onGoogleSignUp() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        const user = result.user;
        const credential = result.credential;

        if (user && credential && 'accessToken' in credential) {
          const token = await user.getIdToken();
          const googleRegisterUserRequest: GoogleRegisterUserRequest = {
            email: user.email || '',
            firstName: user.displayName ? user.displayName.split(' ')[0] : '',
            lastName: user.displayName ? user.displayName.split(' ')[1] : '',
            providerId: user.uid,
            provider: 'GOOGLE',
          };

          this.store.dispatch(
            new AuthActions.GoogleSignUp({
              token,
              provider: googleRegisterUserRequest.provider,
              googleRegisterUserRequest,
            })
          );
        }
      })
      .catch((error) => {
        const httpError = new MyHttpError(
          error,
          ErrorMessage.GOOGLE_LOGIN_FAILURE
        );
        const action = new GoogleSignUpFailure(httpError);
        this.store.dispatch(action);
      });
  }

  // onGoogleSignUp() {
  //   const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  //   this.afAuth
  //     .signInWithPopup(googleAuthProvider)
  //     .then(async (result) => {
  //       const user = result.user;
  //       const credential = result.credential;

  //       if (user && credential && 'accessToken' in credential) {
  //         const token = await user.getIdToken();
  //         const googleRegisterUserRequest: GoogleRegisterUserRequest = {
  //           email: user.email || '',
  //           firstName: user.displayName ? user.displayName.split(' ')[0] : '',
  //           lastName: user.displayName ? user.displayName.split(' ')[1] : '',
  //           providerId: user.uid,
  //           provider: 'google',
  //         };

  //         this.accountService
  //           .signUpWithGoogle(token, googleRegisterUserRequest)
  //           .subscribe(
  //             (response) => {
  //               const action = new GoogleSignUpSuccess({
  //                 user,
  //                 provider: googleRegisterUserRequest.provider,
  //               });
  //               this.store.dispatch(action);
  //             },
  //             (error) => {
  //               const message =
  //                 error?.error?.message || ErrorMessage.DUPLICATED_EMAIL;
  //               const httpError = new MyHttpError(
  //                 JSON.stringify(error),
  //                 message
  //               );
  //               const action = new GoogleSignUpFailure(httpError);
  //               this.store.dispatch(action);
  //             }
  //           );
  //       }
  //     })
  //     .catch((error) => {
  //       const httpError = new MyHttpError(
  //         error,
  //         ErrorMessage.GOOGLE_LOGIN_FAILURE
  //       );
  //       const action = new GoogleSignUpFailure(httpError);
  //       this.store.dispatch(action);
  //     });
  // }
}
