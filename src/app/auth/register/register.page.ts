import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {LoginPage} from '../login/login.page';
import {ExternalApiService} from '../../api/external-api.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: any;
  error: boolean;

  constructor(
    public api: ExternalApiService,
    private storage: Storage,
    private router: Router) {

    this.credentialsForm = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.error = false;
  }

  onFormValidate(credentialsForm) {
    if (credentialsForm.valid) {
      const firstname: string = credentialsForm.value.firstname;
      const lastname: string = credentialsForm.value.lastname;
      const email: string = credentialsForm.value.email;
      const password: string = credentialsForm.value.password;
      const confirm: string = credentialsForm.value.confirmPassword;
      if (password !== confirm) {
        this.error = true;
        console.log('Passwords don\'t match');
        this.refresh();
      }

      const newUser: User = {
        id: '',
        firstname,
        lastname,
        email,
        password
      };
      console.log(newUser);
      this.api.register(newUser)
        .then(data => {
          this.storage.set('token', data['token']);
        });
      this.redirectToRoot();
    }
  }

  redirectToRoot() {
    this.router.navigateByUrl('/login');
  }

  refresh() {
      this.router.navigate(['register']);
  }

  ngOnInit() {
  }

}
