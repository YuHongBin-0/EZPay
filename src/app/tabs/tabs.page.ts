import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
// import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  users: Observable<any>
  userId: string;
  isStudent: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  ngOnInit() {

    this.afAuth.authState.subscribe(async data => {
      if (data && data.uid) {

        this.users = this.afDatabase.object(`users/${data.uid}`).valueChanges();
      }
      else {
        // (await this.toast.create({
        //   message: `Could not find authentication details.`,
        //   duration: 3000
        // }))
        // .present();
      }
    });
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {
      var role = (res.val() && res.val().role).toString();


      console.log('userRole: ' + role)
      if (role == "student") {
        console.log('student')
        this.isStudent = true
        console.log(this.isStudent);
      }
      else if (role == "vendor") {
        console.log('vendor')
        this.isStudent = false;
        console.log(this.isStudent)
      }
    })
    console.log(this.isStudent);
    // firebase.database().ref('/users/' + userId).once('value').then((snapshot) {
    //   var role = (snapshot.val() && snapshot.val().role).toString();

    //   // var role = "vendor";
    //   console.log('userRole: ' + role)
    //   if (role == "student") {
    //     console.log('student')
    //     type = true
    //     // console.log(this.isStudent);
    //   }
    //   else if (role == "vendor") {
    //     console.log('vendor')
    //     type = false
    //     // console.log(this.isStudent);
    //   }

    // })
  }

  gotoHome() {
    this.router.navigateByUrl('/tabs/tab2');

  }

  test() {
    console.log(this.isStudent)
  }
}