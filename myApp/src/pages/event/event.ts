import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  public eventName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.eventName = navParams.get('eventName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
