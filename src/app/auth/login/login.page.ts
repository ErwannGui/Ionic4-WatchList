import { Component, OnInit } from '@angular/core';
import {ExternalApiService} from '../../api/external-api.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: any;

  constructor(
    public router: Router,
    public api: ExternalApiService,
    private storage: Storage) {

    this.credentialsForm = {
      email: '',
      password: ''
    };
  }

  onLogin(credentialsForm) {
    if (credentialsForm.valid) {
      const email: string = credentialsForm.value.email;
      const password: string = credentialsForm.value.password;
      this.api.login(email, password)
        .then(data => {
          if (data['auth'] === true) {
            this.storage.set('token', data['token']);
            this.storage.set('logged', true);
          } else { console.log(data); }
        });
      this.redirectToRoot();
    }
  }

  /*getUsers(email: string, password: string) {
    this.apiProvider.getUsers()
    .then(data => {
      for(let i = 0; i < Object.keys(data).length; i++) {
        if (data[i].email == email && data[i].password == password) {
          console.log(data[i]);
          this.storage.set('id', data[i].id);
          this.storage.set('name', data[i].firstname);
          this.storage.set('logged', true);
          window.location.reload();
          //storage.set('lastname', data[i].lastname);
          //storage.set('email', data[i].email);
          //this.setItems();
          //console.log(this.comments);
        }
      }
      this.redirectToRoot();
      //this.setItems();
      //console.log(this.films);
    });
  }*/

  onForgotPassword() {
    // this.logger.info('LoginPage: onForgotPassword()');
    this.redirectToRoot();
  }

  redirectToRoot() {
    this.router.navigateByUrl('/');
  }


  ngOnInit() {
  }

}
