import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import {ExternalApiService} from './api/external-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  // make LoginPage the root (or first) page
  pages: Array<{title: string, path: string}>;
  logged: boolean;
  name: string;

  constructor(
    public router: Router,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private api: ExternalApiService,
  ) {
    this.initializeApp();

    this.storage.get('logged').then((val) => {
      console.log('Logged : ' + val);
      if (val !== true) {
        console.log('No session defined ' + val);
        this.logged = false;
        this.name = '';
        this.pages = [
          { title: 'Homepage', path: '' },
          { title: 'Films', path: 'list' },
          { title: 'Login', path: 'login' },
          /*{ title: 'Photos', path: 'camera' },*/
          { title: 'QR Reader', path: 'qr-reader' }
        ];
      } else {
        this.storage.get('name').then((value) => {
          this.name = value;
          this.logged = true;
          console.log(this.name + ' ' + this.logged);
          if (this.logged === true) {
            this.pages = [
              { title: 'Homepage', path: '' },
              { title: 'Films', path: 'list' },
              { title: 'Favorites', path: 'favorite' },
              { title: 'Chat', path: 'chat' },
              /*{ title: 'Photos', path: 'camera' },*/
              { title: 'QR Reader', path: 'qr-reader' }
            ];
          }
          // this.isLogged(this.name);
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: string) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.router.navigateByUrl('/' + page);
  }

  isLogged(name: string) {
    if (name === 'Erwann') {
      this.logged = true;
      console.log(name + ' is logged ? ' + this.logged);
    }
    return this.logged;
  }


  doLogout() {
    /*this.storage.remove('name').then((val) => {
      console.log('Session is now '+val);
    });*/
    this.storage.clear();
    window.location.reload();
    this.api.logout();
  }
}
