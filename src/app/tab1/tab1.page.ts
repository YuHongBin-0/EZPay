import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  reference = [];
  avail = true
  userId = firebase.auth().currentUser.uid;
  refItems = firebase.database().ref('transaction');
  isStudent: boolean;
  refstall = [];
  refStalls = firebase.database().ref('stalls');
  refuser = [];
  refUsers = firebase.database().ref('user');

  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
              public afdatabase: AngularFireDatabase, private router: Router) {
  }

  panelOpenState = false;

  ngOnInit() {

    var userId = firebase.auth().currentUser.uid
   

      firebase.database().ref(`/users/` + userId).once('value').then(res => {
        var role = (res.val() && res.val().role).toString();
        if (role == "student") {
          this.isStudent = true
        }
        else if (role == "vendor") {
          this.isStudent = false;
        }
      })

    this.refItems.on('value', resp => {
      this.reference = snapshotToArray(resp);
    });

    this.refStalls.on('value', resp => {
      this.refstall = snapshotToArray1(resp);
    });
  }

  sendToReportError(){
    this.router.navigateByUrl('/report');
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.refItems.on('value', resp => {
      this.reference = snapshotToArray(resp);
    });

    this.checkAvail()
        console.log('Async operation has ended');
        event.target.complete();

  }

  checkAvail() {
    if (this.reference.length == 0) {
      console.log('true')
      this.avail = true
    } else {
      console.log('false')
      this.avail = false
    }
  }

}

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};

export const snapshotToArray1 = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};

