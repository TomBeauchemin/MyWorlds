import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController } from 'ionic-angular';

import { EventPage } from '../event/event'

@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  public groupName:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alerCtrl: AlertController, 
    public appCtrl: App) {

  	this.groupName = navParams.get('groupName');
  }

  createEvent() {
    let alert = this.alerCtrl.create({
      title: 'Create Event',
      message: this.groupName.name,
      inputs: [
        {
          name: 'Name of Event',
          placeholder: 'Name of Event'
        },
        {
          name: 'Event Date',
          placeholder: 'Event Date'
        },
        {
          name: 'Event Time',
          placeholder: 'Event Time'
        },
        {
          name: 'Location',
          placeholder: 'Location'
        },
        {
          name: 'Description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Ok'
        },
        {
          text: 'Cancel'
        }
      ]
    });
    alert.present()
  }

  itemSelected(item: string) {
    this.appCtrl.getRootNav().push(EventPage, {
      eventName: item
    });
  }

}
