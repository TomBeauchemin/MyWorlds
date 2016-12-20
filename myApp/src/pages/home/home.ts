import { Component } from '@angular/core';

import { NavController, ViewController, AlertController } from 'ionic-angular';

import {GroupPage} from '../group/group'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groupPage = GroupPage;

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

  createGroup() {
    let alert = this.alerCtrl.create({
      title: 'Create Group',
      inputs: [
      	{
      		name: 'Name of Group',
      		placeholder: 'Princeton Class of 2017'
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
