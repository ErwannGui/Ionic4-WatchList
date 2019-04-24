import { Component } from '@angular/core';
import {CryptoService} from '../security/crypto.service';
import {ExternalApiService} from '../api/external-api.service';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

  name: string;
  token: string;
  data: string;
  encryptedData: string;
  decryptedData: string;

    constructor(
      public api: ExternalApiService,
      public crypto: CryptoService,
      private platform: Platform,
      private storage: Storage,
      // private geolocation: Geolocation,
    ) {

        this.storage.get('token').then(data => {
            this.token = data;

            if (this.token !== undefined) {
                console.log(this.token);
                this.api.profile(this.token)
                .then(data => {
                    console.log(data);
                    this.name = data['firstname'];
                    this.storage.set('username', data['email'].substring(0, data['email'].lastIndexOf("@")));
                });
            }
        });

        if (this.platform.is('cordova')) {
            this.crypto.generateSecureKeyAndIV();
            this.data = "hello world";
            this.encryptedData = this.crypto.encrypt(this.data);
            this.decryptedData = this.crypto.decrypt(this.encryptedData);
        }

        /*this.geolocation.getCurrentPosition().then(res => {
            console.log(res.coords.latitude);
            console.log(res.coords.longitude);
            this.location = new LatLng(res.coords.latitude, res.coords.longitude);
        }).catch(error => {
            console.log('Error getting location', error);
        });*/
    }

    /*addMarker() {
        this.map.addMarker({
            title: 'Vous êtes ici !',
            icon: 'red',
            animation: 'DROP',
            position: {
                lat: this.location.lat,
                lng: this.location.lng
            }
        })
            .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                    alert('Bienvenue chez moi !!');
                });
            });
    }

    ionViewDidLoad() {
        if (this.platform.is('cordova')) {
            this.platform.ready().then(() => {
                let element = this.mapElement.nativeElement;
                this.map = this.googleMaps.create(element);

                this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
                    let options = {
                        target: this.location,
                        zoom: 12
                    };

                    this.map.moveCamera(options);
                    setTimeout(500);
                    this.addMarker();
                });
            });
        }
    }*/
}
