import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';
import 'rxjs/add/operator/filter';
import firebase from 'firebase';

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTracker {
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone) {
 
  }
 
  startTracking() { 

    // Background Tracking 
    let config = { 
      desiredAccuracy: 0, 
      stationaryRadius: 20, 
      distanceFilter: 10, 
      debug: true, 
      interval: 2000 
    }; 

    BackgroundGeolocation.configure((location) => { 
      console.log('BackgroundGeolocation: ' + location.latitude + ',' + location.longitude); 
      
      // Run update inside of Angular's zone 
      this.zone.run(() => { 
        this.lat = location.latitude; 
        this.lng = location.longitude; 
        this.storeData(this.lat, this.lng);
      }); 
    }, (err) => { 
      console.log(err); 
    }, config); 

    // Turn ON the background-geolocation system. 
    BackgroundGeolocation.start(); 

    // Foreground Tracking 
    let options = { 
      frequency: 3000, 
      enableHighAccuracy: true 
    }; 

    this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => { 
      console.log(position); 

      // Run update inside of Angular's zone 
      this.zone.run(() => { 
        this.lat = position.coords.latitude; 
        this.lng = position.coords.longitude; 
        console.log(this.lat);
        console.log(this.lng);
        console.log("hi");
        this.storeData(this.lat, this.lng);
      });

    });

  }

  stopTracking() {
  
    console.log('stopTracking');
 
    BackgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

  storeData(lat: number, lng: number) {
  	let email = firebase.auth().currentUser.email;
  	let currentUser = email.replace('.', ',');
  	firebase.auth().currentUser.uid
	let locData = {
		lat: this.lat,
		lng: this.lng,
		email: email,
		uid: firebase.auth().currentUser.uid
	};
	var updates = {};
	updates['/userProfile/' + currentUser] = locData;

	firebase.database().ref().update(updates);
  }
}
