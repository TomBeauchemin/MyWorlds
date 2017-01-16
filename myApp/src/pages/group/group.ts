import { Component, NgZone } from '@angular/core';
import { App, NavController, NavParams, AlertController } from 'ionic-angular';

import { EventPage } from '../event/event';
import { CreateEventPage } from '../create-event/create-event';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {
  public eventList: any;
  public groupId:any;
  public group:any;
  public events:any;
  public zone:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alerCtrl: AlertController, 
    public appCtrl: App) {

    this.zone = new NgZone({enableLongStackTrace: false});

  	this.groupId = navParams.get('group');

    this.group = firebase.database().ref('groups/' + this.groupId);
    this.group.on('value', snapshot => {
      this.zone.run(() => {
        let raw = {
          id: snapshot.key,
          name: snapshot.val().name,
          author: snapshot.val().author
        };
        this.group = raw;
      });
    });

    this.events = firebase.database().ref('groups/' + this.groupId + '/events/');
    this.events.on('value', snapshot => {
      this.zone.run(() => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList = rawList.concat({
            id: snap.key,
            author: snap.val().author,
            name: snap.val().name,
            eventDate: snap.val().eventDate,
            eventTime: snap.val().eventTime,
            location: snap.val().location,
            description: snap.val().description,
          });
        });
        this.eventList = rawList;
      });
    });
  }

  createEvent() {
    let me = this;
    console.log(this.groupId);
    this.appCtrl.getRootNav().push(CreateEventPage, {
      groupId: me.groupId
    });
  }

  invitePeople() {
    let alert = this.alerCtrl.create({
      title: 'Add member',
      message: this.group.name,
      inputs: [
        {
          name: 'name',
          placeholder: 'Full Name'
        },
        {
          name: 'email',
          placeholder: 'Email Address'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: formData => {
            this.addNewMember(formData.email, this.group.name, this.group.author, this.groupId);
          }
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
      eventId: item,
      groupId: this.groupId
    });
  }

  addNewMember(email, name, author, groupId) {
    var user = firebase.database().ref(
    'userProfile/' + email.replace('.', ',') + '/uid');
    user.on('value', function(data) {
      if (data !== null) {
        var groupData = {
          author: author,
          name: name
        };

        var updates = {};
        updates['/user-groups/' + data.val() + '/' + groupId] = groupData;
        return firebase.database().ref().update(updates);
      }

      else {

      }
    });
    
  }

}
