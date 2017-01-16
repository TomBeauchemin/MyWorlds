import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { AutocompletePage } from '../autocomplete/autocomplete';

declare var google;

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})

export class MapViewPage {
 
  map: any;
  address: any;
  pos: any;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, private modalCtrl: ModalController) {
 	  this.address = {
      place: ''
    };
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
      if (data.length > 0) {
        this.geocodeAddress(this.address.place)
      }
    });
    modal.present();
  }

  dismissModal() {
    let data = {
      address: this.address.place,
      lat: this.pos.lat(),
      lng: this.pos.lng()
    };
    this.viewCtrl.dismiss(data);
  }

  geocodeAddress(address) {
    let geocoder = new google.maps.Geocoder();
    let me = this;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status == 'OK') {
        let latLng = results[0].geometry.location;
        me.pos = latLng;
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(document.getElementById("map"), mapOptions); 
        var marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  loadMap(){

    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 	
      this.map = new google.maps.Map(document.getElementById("map"), mapOptions); 
    }, (err) => {
      console.log(err);
    });
  }

  placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: this.map
    });
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";          
   
    this.addInfoWindow(marker, content);
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
}