import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MapViewPage } from '../map-view/map-view';
/*
  Generated class for the CreateEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {
  
  public eventCreateForm;
  public groupId: any;
  private submitAttempt = false;
  private lat: any;
  private lng: any;
  private address: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public formBuilder: FormBuilder,
    private modalCtrl: ModalController) 
  {
    console.log(this.groupId);
    this.groupId = navParams.get('groupId');
    this.address = '';
  	this.eventCreateForm = formBuilder.group({
      eventName: ['', Validators.compose([Validators.required])],
      eventDesc: ['', Validators.compose([Validators.required])],
      eventLocation: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])]
    });
  }

  createEvent() {
  	this.submitAttempt = true;
    console.log('hi!');
    this.writeNewEvent();
  }

  writeNewEvent() {
    var eventData = {
      author: firebase.auth().currentUser.email,
      name: this.eventCreateForm.value.eventName,
      description: this.eventCreateForm.value.eventDesc,
      dateTime: this.eventCreateForm.value.date,
      location: this.address,
      lat: this.lat,
      lng: this.lng,
    };

    console.log(eventData);
    // Get a key for a new Group.
    var newGroupKey = firebase.database().ref().child('groups/' + this.groupId).push().key;
    console.log(newGroupKey);
    console.log(this.groupId);
    var updates = {};
    updates['/groups/' + this.groupId + '/events/' + newGroupKey] = eventData;
    firebase.database().ref().update(updates);
    this.navCtrl.pop();
  }
  selectLocation() {
    let modal = this.modalCtrl.create(MapViewPage);
    let me = this;
    modal.onDidDismiss(data => {
      me.address = data.address;
      me.lat = data.lat;
      me.lng = data.lng; 
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
