import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InternalApiService {

  apiUrl = 'http://www.omdbapi.com/';
  apiKey = 'd55be316';
  search = '';

  constructor(public http: HttpClient) { }

  getFilms(val) {
    this.search = val;
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '?apikey=' + this.apiKey + '&s=' + this.search).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // True Observable for exemple
  getFilmById(filmId: string): Observable<any> {
    return this.http.get(this.apiUrl + '?apikey=' + this.apiKey + '&i=' + filmId).pipe(
        map(data => {
          return data;
        })
      // console.log(data);
    );
  }
}
