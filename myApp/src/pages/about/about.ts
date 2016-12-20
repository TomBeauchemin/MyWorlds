import { Component } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';

import {EventPage} from '../event/event'


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor (
    public navCtrl: NavController, 
    public alerCtrl: AlertController, 
    public appCtrl: App) {
  }

  loginForm() {
    let alert = this.alerCtrl.create({
      title: 'Login',
      inputs: [
      	{
      		name: 'Username',
      		placeholder: 'Username'
      	},
      	{
      		name: 'Password',
      		placeholder: 'Password'
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

  createEvent() {
    let alert = this.alerCtrl.create({
      title: 'Create Event',
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

  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];

  itemSelected(item: string) {
    this.appCtrl.getRootNav().push(EventPage, {
      eventName: item
    });
  }

}