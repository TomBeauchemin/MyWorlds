import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  public zone:any;
  public eventId:any;
  public groupId:any;
  public event:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams) {

  	this.eventId = navParams.get('eventId');
  	this.groupId = navParams.get('groupId');

  	this.zone = new NgZone({enableLongStackTrace: false});

  	this.event = firebase.database().ref('groups/' + this.groupId + '/events/' + this.eventId);
    this.event.on('value', snapshot => {
      this.zone.run(() => {
        let raw = {
          id: snapshot.key,
          name: snapshot.val().name,
          location: snapshot.val().location,
          description: snapshot.val().description,
          dateTime: snapshot.val().dateTime,
          author: snapshot.val().author
        };
        this.event = raw;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
