import { Component } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {EventPage} from '../event/event'

export class Event {
  name: string;
  date: string;
  location: string;
  time: string;
  description: string;
 
  constructor(name: string, date: string, time: string, location: string, description: string) {
    this.name = name;
    this.date = date;
    this.time = time;
    this.location = location;
    this.description = description;
  }
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor (
    public navCtrl: NavController, 
    public alerCtrl: AlertController, 
    public appCtrl: App,
    private auth: AuthService) {
  }

  logout(){
    this.auth.logoutUser().then(() => {
      this.appCtrl.getRootNav().setRoot(LoginPage)
    });
  }

  createEvent(data) {
    let alert = this.alerCtrl.create({
      title: 'Create Event',
      message: data,
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

  public doRadio() {
    let alert = this.alerCtrl.create();
    alert = this.alerCtrl.create();
    alert.setTitle('Select Group For Event');
    if (this.items.length > 0) {
      alert.addInput({type: 'radio', label: this.items[0].name, value: this.items[0].name, checked: true});
    }
    for (var i = 1; i < this.items.length; i++) {
      alert.addInput({type: 'radio', label: this.items[i].name, value: this.items[i].name, checked: false});
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        alert.dismiss().then(() => {
          this.createEvent(data);
        });
        return false;
      }
    });

    alert.present()
  }

  items = [
    new Event('Party1', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party2', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party3', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party4', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party5', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party6', 'December 17th', '3:00PM', 'My House', 'Come Hang'),
  ];

  itemSelected(item: string) {
    this.appCtrl.getRootNav().push(EventPage, {
      eventName: item
    });
  }

}