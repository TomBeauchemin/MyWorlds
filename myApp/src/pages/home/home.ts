import { Component } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { GroupPage } from '../group/group'
import { Event } from '../about/about'

import firebase from 'firebase';


export class Group {
  name: string;
  events = [];
 
  constructor(name: string, events) {
    this.name = name;
    this.events = events
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  createGroup() {
    let alert = this.alerCtrl.create({
      title: 'Create Group',
      inputs: [
      	{
      		name: 'Name of Group',
      		placeholder: 'Name of Group'
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

  items = [
    new Group('Princeton Class of 2017', [new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang')]), new Group('Princeton Class of 2018', [new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang')]), new Group('Princeton Class of 2019', [new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang')]), new Group('Princeton Class of 2020', [new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang'), new Event('Party', 'December 17th', '3:00PM', 'My House', 'Come Hang')])
  ];

  itemSelected(item: string) {
   this.appCtrl.getRootNav().push(GroupPage, {
   	groupName: item
   });
  }

}
