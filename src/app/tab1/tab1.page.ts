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
  userId = firebase.auth().currentUser.uid;
  refItems = firebase.database().ref('transaction');

  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
              public afdatabase: AngularFireDatabase, private router: Router) {
  }

  panelOpenState = false;

  ngOnInit() {
    this.refItems.on('value', resp => {
      this.reference = snapshotToArray(resp);
    });
  }

  sendToReportError(){
    this.router.navigateByUrl('/report');
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