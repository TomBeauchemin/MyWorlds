import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Event } from '../about/about'

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
