import { Component } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';

import {GroupPage} from '../group/group'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
   this.appCtrl.getRootNav().push(GroupPage, {
   	groupName: item
   });
  }

}
