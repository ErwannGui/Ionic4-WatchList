import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../auth/user';
import { Favorite } from '../list/favorite';
import { Comment } from '../list/comment';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  apiUrl = 'https://api-ionic-watchlist.herokuapp.com';
  httpOptions;
  constructor(public http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': 'my-auth-token'
      })
    };
  }


  // User requests

  login(email: string, password: string) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/api/auth/login', {email: email, password: password}).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  logout() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/api/auth/logout').subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  register(user: User) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/api/auth/register', user).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  profile(token: string) {
    // this.headers.set('Authorization', token);
    this.httpOptions.headers = this.httpOptions.headers.set('x-access-token', token);
    // console.log(this.httpOptions.headers.get('x-access-token'));
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/api/auth/profile', this.httpOptions).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.error(err);
      });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/api/users').subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getUserById(userId: number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/api/users/' + userId).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createUser(user: User) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/api/users', user).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  updateUser(user: User) {
      return new Promise(resolve => {
          this.http.put(this.apiUrl + '/api/users/' + user.id, user).subscribe(data => {
              resolve(data);
              // console.log(data);
          }, err => {
              console.log(err);
          });
      });
  }

  deleteUserById(userId: number) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/api/users/' + userId).subscribe( err => {
        console.log(err);
      });
    });
  }

  // Commment requests

  getComments() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/comments').subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createComment(comment: Comment) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/comments', comment).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  updateComment(comment: Comment) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/comments/' + comment.id, comment).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteCommentById(commentId: number) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/comments/' + commentId).subscribe( err => {
        console.log(err);
      });
    });
  }

  // Favorite requests

  getFavorites() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/favorites').subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createFavorite(favorite: Favorite) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/favorites', favorite).subscribe(data => {
        resolve(data);
        // console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteFavoriteById(favoriteId: number) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/favorites/' + favoriteId).subscribe( err => {
        console.log(err);
      });
    });
  }
}
