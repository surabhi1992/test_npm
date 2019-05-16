import { AppHttpInterceptorService }
        from '@goaaa-mwg-tt/ionic-common';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {GoaaaMwgTtCommonModule, GoaaaEnvironment, CommonAppSettingsProvider} from '@goaaa-mwg-tt/ionic-common'
import {EnvConfig} from '@env';

export function getConfig(): any {
    return new EnvConfig();
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    GoaaaMwgTtCommonModule.forRoot(getConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    AppHttpInterceptorService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AppHttpInterceptorService,
        multi: true,
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonAppSettingsProvider,
    GoaaaEnvironment
  ]
})
export class AppModule {}
