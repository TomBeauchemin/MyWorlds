import { Component } from '@angular/core';

import { NavController, ViewController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public alerCtrl: AlertController) {
  }

  loginForm() {
    let alert = this.alerCtrl.create({
      title: 'Login',
      inputs: [
      	{
      		name: 'Username',
      		placeholder: 'username'
      	},
      	{
      		name: 'Password',
      		placeholder: 'password'
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
      title: 'Create Group',
      inputs: [
      	{
      		name: 'Name of Event',
      		placeholder: 'Dinner at Ruby\'s'
      	},
      	{
      		name: 'Event Date',
      		placeholder: '12/16/2107'
      	},
      	{
      		name: 'Location',
      		placeholder: '1234 Rose St'
      	},
      	{
      		name: 'Event Time',
      		placeholder: '7:30-9:30'
      	},
      	{
      		name: 'Description',
      		placeholder: 'Let\'s get together!'
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
    console.log("Selected Item", item);
  }

}