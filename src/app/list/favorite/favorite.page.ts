import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {InternalApiService} from '../../api/internal-api.service';
import {ExternalApiService} from '../../api/external-api.service';
import {Storage} from '@ionic/storage';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  films: any;
  nbResult: number;
  error: boolean;
  constructor(
    public router: Router,
    public data: InternalApiService,
    public api: ExternalApiService,
    private storage: Storage) {

    this.nbResult = 0;
    this.error = false;
    this.films = [];
    this.getFavorites();
  }

  getFavorites() {
    this.api.getFavorites()
    .then(favorites => {
      console.log(favorites);
      this.storage.get('id').then(id => {
        console.log(id);
        let y = 0;
        for (let i = 0; i < Object.keys(favorites).length; i++) {
          console.log(favorites[i]);
          if (favorites[i].user === id) {
            this.data.getFilmById(favorites[i].film).pipe(map(film => {
                this.films[y] = film;
                console.log(this.films);
                y++;
            }));
          }
        }
      });
    });
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
