import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  users: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.afAuth.authState.subscribe(async data => {
      if (data && data.uid) {

        this.users = this.afDatabase.object(`users/${data.uid}`).valueChanges();
      }

    });
  }

}
