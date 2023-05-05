import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { FooterModule } from './footer/footer.module';
import { PreloadAllModules, RouterModule } from '@angular/router';
import AppRoutes from './app.routes';
import { GPageNotFoundComponent } from './g-page-not-found/g-page-not-found.component';
import { BrowseModule } from './browse/browse.module';
import { BookModule } from './book/book.module';
import { SearchModule } from './search/search.module';
import { BookService } from './services/book.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { CartEffects } from './store/cart/cart.effects';
import { OrderEffects } from './store/order/order.effects';
import { CartService } from './services/cart.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './services/order.service';
import { TokenService } from './services/token.service';
import { AuthEffects } from './store/authorization/authorization.effects';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthGuardService } from './services/auth-guard.service';
import { ShowcaseEffects } from './store/showcase/showcase.effects';
import { AccountService } from './services/account.service';
import { BrowseEffects } from './store/browse/browse.effects';
import { VerificationModule } from './verification/verification.module';
import { NonAuthGuardService } from './services/non-auth-guard.service';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../enviroments/enviroment';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    GPageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    HomeModule,
    BrowseModule,
    BookModule,
    VerificationModule,
    SearchModule,
    AuthModule,
    FooterModule,
    HttpClientModule,
    NgbModule,
    SocialLoginModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CartEffects, OrderEffects, AuthEffects, ShowcaseEffects, BrowseEffects]),
    RouterModule.forRoot(AppRoutes, { useHash: false, preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(environment.firebase),
    NgbToastModule
  ],
  providers: [BookService, CartService, OrderService, TokenService, AuthGuardService, NonAuthGuardService, AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID, // Provedor do Google
            provider: new GoogleLoginProvider('186730369443-t65ij8igqirdcrlrnp6hmtaq9u7bg77m.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID, // Provedor do Facebook
            provider: new FacebookLoginProvider('974004276834842')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
