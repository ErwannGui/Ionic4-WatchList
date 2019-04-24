import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ExternalApiService} from '../../api/external-api.service';
import {InternalApiService} from '../../api/internal-api.service';
import {AlertController} from '@ionic/angular';
import {Comment} from '../comment';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  selectedItem: any;
  comments: any;
  nbComments: number;
  commentForm: any;
  filmId: string;
  logged: boolean;

  constructor(
    private route: ActivatedRoute,
    public api: ExternalApiService,
    public data: InternalApiService,
    public alertCtrl: AlertController,
    private storage: Storage) {
    this.selectedItem = [];
    this.filmId = this.route.snapshot.paramMap.get('id');
    this.getData();
    this.nbComments = 0;
    this.comments = [];
    this.commentForm = {commentContent: ''};
    this.storage.get('logged').then( val => {
      this.logged = val;
    });
    this.getComments(this.filmId);
  }

  getData() {
    this.data.getFilmById(this.filmId)
      .subscribe(film => {
        this.selectedItem = film;
        console.log(this.selectedItem);
      });
  }

  getComments(filmId: string) {
    this.api.getComments()
      .then(data => {
        let y = 0;
        this.nbComments = Object.keys(data).length;
        for ( let i = 0; i < this.nbComments; i++) {
          if (data[i].film === filmId) {
            this.comments[y] = data[i];
            y++;
            // this.setItems();
            // console.log(this.comments);
          }
        }
      });
  }

  deleteComment(comment: Comment) {
    this.api.deleteCommentById(comment.id);
    for ( let i = 0; i < this.comments.length; i++) {
      console.log(this.comments[i].id + ' - ' + comment.id);
      if ( this.comments[i].id === comment.id) {
        this.comments.splice(i, 1);
        console.log(this.comments);
      } else { console.log('Comment not found');
      }
    }
  }

  createComment() {
    const content: string = this.commentForm.value.commentContent;
    const newComment: Comment = {
      id: this.nbComments + 1,
      film: this.filmId,
      user: '5bc0eae4b2bee12fbce44ac0',
      content};
    console.log(newComment);
    this.api.createComment(newComment);
    // this.doRefresh();
  }

  doRefresh(refresher) {
    this.getComments(this.filmId);
    refresher.complete();
  }

  async doConfirm(comment: Comment) {
    const confirm = await this.alertCtrl.create({
      header: 'Delete this comment ?',
      message: 'Do you agree to delete this comment from database ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteComment(comment);
          }
        }
      ]
    });
    return await confirm.present();
  }

  ngOnInit() {
    console.log(this.filmId);
  }

}
