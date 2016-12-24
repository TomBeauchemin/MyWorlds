import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyD0kMTqGwSITp2GqUTrmKu-2qDtHo2RY9U",
      authDomain: "myworlds-86018.firebaseapp.com",
      databaseURL: "https://myworlds-86018.firebaseio.com",
      storageBucket: "myworlds-86018.appspot.com",
      messagingSenderId: "924040767223"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
