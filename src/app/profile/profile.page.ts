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
  balance: number;
  name: string;
  class: string;
  role: string;
  NRIC: string;
  email: string;
  department: string;
  stallNo: string;
  level: string;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  ngOnInit() {

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {
      var bal = (res.val() && res.val().balance);
      this.balance = bal;
      var disName = (res.val() && res.val().name);
      this.name = disName;
      var disClass = (res.val() && res.val().class);
      this.class = disClass;
      var disRole = (res.val() && res.val().role);
      this.role = disRole;
      var disNRIC = (res.val() && res.val().NRIC);
      this.NRIC = disNRIC;
      var disEmail = (res.val() && res.val().email);
      this.email = disEmail;
      var disDepartment = (res.val() && res.val().department);
      this.department = disDepartment;
      var disStallNo = (res.val() && res.val().stallNo);
      this.stallNo = disStallNo;
      var disLevel = (res.val() && res.val().level);
      this.level = disLevel

      console.log(this.name + " has $" + this.balance);
      
    })
  }

  ionViewWillEnter() {
  //   this.afAuth.authState.subscribe(async data => {
  //     if (data && data.uid) {

  //       this.users = this.afDatabase.object(`users/${data.uid}`).valueChanges();
  //     }

  //   });
  // }

  }
}
