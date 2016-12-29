import { Component, Pipe } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { GroupPage } from '../group/group';
import { GroupData } from '../../providers/group-data';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public groupList: any;

  constructor (
  	public navCtrl: NavController, 
  	public alerCtrl: AlertController, 
  	public appCtrl: App,
    private auth: AuthService,
    private groupData: GroupData) {
    this.groupData = groupData;

    this.groupData.getGroupList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList = rawList.concat({
          id: snap.key,
          name: snap.val().name, 
          author: snap.val().author,
        });
      });
      this.groupList = rawList;
    });
  }

  logout(){
    this.auth.logoutUser().then(() => {
      this.appCtrl.getRootNav().push(LoginPage)
    });
  }

  createGroup() {
    let alert = this.alerCtrl.create({
      title: 'Create Group',
      inputs: [
      	{
      		name: 'groupname',
      		placeholder: 'Name of Group',
          value: ''
      	}
      ],
      buttons: [
      	{
      		text: 'Ok',
          handler: formData => {
            this.writeNewGroup(formData.groupname, firebase.auth().currentUser.email, firebase.auth().currentUser.uid, []);
          }
      	},
      	{
      		text: 'Cancel'
      	}
      ]
    });
    alert.present()
  }


  itemSelected(item) {
   this.appCtrl.getRootNav().push(GroupPage, {
   	group: item
   });
  }

  writeNewGroup(name, username, uid, members) {
    // A post entry.
    var groupData = {
      author: username,
      name: name,
      members: members
    };

    // Get a key for a new Group.
    var newGroupKey = firebase.database().ref().child('groups').push().key;

    // Write the new groups's data simultaneously in the groups list and the user's group list.
    var updates = {};
    updates['/groups/' + newGroupKey] = groupData;
    updates['/user-groups/' + uid + '/' + newGroupKey] = groupData;

    return firebase.database().ref().update(updates);
  }

}
