import { Component, OnInit } from '@angular/core';
import {InternalApiService} from '../../api/internal-api.service';
import {Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  films: any;
  nbResult: number;
  error: boolean;

  constructor(public router: Router, public data: InternalApiService) {

    this.nbResult = 0;
    this.error = false;
    this.films = [];

  }

  getFilms(ev: any) {
    const timeout = setTimeout( () => {
      const val = ev.target.value;
      if (val && val.trim() !== '') {
        this.data.getFilms(val)
          .then(data => {
            if ( data['Response'] ) {
              this.films = data['Search'];
              this.nbResult = data['totalResults'];
              console.log(this.films);
            } else {
              this.error = true;
            }
          });
      } else {
          return;
      }
    }, 1000);
  }

  itemTapped(event, filmId: string) {
    /*this.navCtrl.push(ItemDetailsPage, {
      filmId: filmId
    });*/
    console.log(filmId);
    this.router.navigate(['details' + '/' + filmId]);
  }

  ngOnInit() {
  }

}
