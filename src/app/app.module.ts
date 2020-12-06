import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './services/interceptors/auth-interceptor.service';
import {AboutComponent} from './core/about/about.component';
import {RestaurantsComponent} from './core/restaurants/restaurants.component';
import {ContactsComponent} from './core/contacts/contacts.component';
import {HeaderComponent} from './modules/shared/Components/header/header.component';
import {FooterComponent} from './modules/shared/Components/footer/footer.component';
import {SharedModule} from './modules/shared/shared.module';
import {AgmCoreModule} from '@agm/core';
import {ModalModule} from './modules/modal/modal.module';
import {ModalConfig} from './modules/modal/modal-config';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1061454832254-gmtf93gsd97q7rbike76blig84ciidls.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RestaurantsComponent,
    ContactsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    SocialLoginModule,
    SharedModule,
    ModalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDuresUfJJc1AUIQNP6Z4uFoIoldUEv6l4'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {provide: ModalConfig, useClass: ModalConfig} // !!!!!!!!!!!!!!!!!!!!
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
