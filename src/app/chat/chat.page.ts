import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {ToastController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages = [];
  nickname = '';
  message = '';
  target = '';
  rooms = [];
  clients = [];
  expanded: boolean;
  itemExpandHeight: number;

  constructor(
      public router: Router,
      private socket: Socket,
      private storage: Storage,
      private toastCtrl: ToastController
  ) {
    // this.expanded = false;
    // this.itemExpandHeight = 100;

    // this.rooms = ['global'];

    this.storage.get('username').then(data => {
      this.nickname = data;
      this.socket.emit('set-nickname', this.nickname);
    });

    this.getAllClients().subscribe(clientlist => {
      for (let i = 0; i < Object.keys(clientlist).length; i++) {
        const index = this.clients.indexOf(clientlist[i]);
        if (index > -1) {
          this.clients.push(clientlist[i]);
        }
      }
    });

    /*this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getPrivateMsg().subscribe(message => {
      if (message.target === this.nickname || message.from === this.nickname) {
        this.messages.push(message);
      }
    });*/

    /*this.getUsers().subscribe(data => {
      const user = data.user;
      if (data.event === 'left') {
        const index = this.clients.indexOf(user);
        if (index > -1) {
            this.clients.splice(index, 1);
        }
        this.showToast('User left: ' + user);
      } else {
        const index = this.clients.indexOf(user);
        if (index > -1) {
            this.clients.splice(index, 1);
        }
        this.showToast('User joined: ' + user);
      }
    });*/
  }

  getAllClients() {
    const observable = new Observable(observer => {
      this.socket.on('clients', (data) => {
          observer.next(data);
      });
    });
    return observable;
  }

  joinRoom() {
    let room = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      room += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.socket.emit('room', room);
    this.rooms.push(room);
  }

  sendMessage() {
    if (this.target !== '') {
      this.socket.emit('add-private-message', { target: this.target, text: this.message });
    } else {
      this.socket.emit('add-message', { text: this.message });
    }
    this.message = '';
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getPrivateMsg() {
    const observable = new Observable(observer => {
      this.socket.on('private-message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getUsers() {
    const observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  expandItem() {
    this.expanded = !this.expanded;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
