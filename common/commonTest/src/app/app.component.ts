import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoaaaEnvironment } from '@goaaa-mwg-tt/ionic-common';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, env: GoaaaEnvironment) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(`Running in ${env.name} environment...`);
      console.log(`Using Google map key: ${env.googleMapApiKey}`);

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

