import { Component, NgZone } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {EventPage} from '../event/event'
import {GroupData} from '../../providers/group-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public groups:any;
  public events:any;
  public zone:any;
  public currentUser:any;
  public groupSelected:any;

  constructor (
    public navCtrl: NavController, 
    public alerCtrl: AlertController, 
    public appCtrl: App,
    private auth: AuthService,
    private groupData: GroupData) {

    this.groupData = groupData;

    this.zone = new NgZone({enableLongStackTrace: false});

    this.currentUser = firebase.auth().currentUser.uid;

    this.groupData.getGroupList().on('value', snapshot => {
      this.events = [];
      let rawList = [];
      snapshot.forEach( snap => {
        rawList = rawList.concat({
          id: snap.key,
          name: snap.val().name
        });
      });
      this.groups = rawList;
      this.groups.forEach( group => {
        let eventTemp = firebase.database().ref('groups/' + group.id + '/events/');
        eventTemp.once('value', snapshot => {
          snapshot.forEach( snap => {
            let raw = {
             id: snap.key,
             name: snap.val().name,
             groupId: group.id
            };
            this.events = this.events.concat(raw);
            return false;
          });
        });
      });
    });
  }

  logout(){
    this.auth.logoutUser().then(() => {
      this.appCtrl.getRootNav().push(LoginPage)
    });
  }

  createEvent(data) {
    let alert = this.alerCtrl.create({
      title: 'Create Event',
      message: data.name,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name of Event'
        },
        {
          name: 'date',
          placeholder: 'Event Date'
        },
        {
          name: 'time',
          placeholder: 'Event Time'
        },
        {
          name: 'location',
          placeholder: 'Location'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: formData => {
            this.writeNewEvent(formData.name, this.groupSelected.id, firebase.auth().currentUser.email, firebase.auth().currentUser.uid, formData.date, formData.time, formData.location, formData.description);
          }
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
    if (this.groups.length > 0) {
      alert.addInput({type: 'radio', label: this.groups[0].name, value: this.groups[0], checked: true});
    }
    for (var i = 1; i < this.groups.length; i++) {
      alert.addInput({type: 'radio', label: this.groups[i].name, value: this.groups[i], checked: false});
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        alert.dismiss().then(() => {
          this.groupSelected = data;
          this.createEvent(data);
        });
        return false;
      }
    });

    alert.present()
  }

  itemSelected(item) {
    this.appCtrl.getRootNav().push(EventPage, {
      eventId: item.id,
      groupId: item.groupId
    });
  }

  writeNewEvent(name, groupId, username, uid, eventDate, eventTime, location, description) {
    var eventData = {
      author: username,
      name: name,
      eventDate: eventDate,
      eventTime: eventTime,
      location: location,
      description: description,
    };

    // Get a key for a new Group.
    var newGroupKey = firebase.database().ref().child('groups/' + groupId).push().key;

    var updates = {};
    updates['/groups/' + this.groupSelected.id + '/events/' + newGroupKey] = eventData;

    return firebase.database().ref().update(updates);
  }

}