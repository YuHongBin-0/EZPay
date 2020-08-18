import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-history',
  templateUrl: './adm-history.page.html',
  styleUrls: ['./adm-history.page.scss'],
})
export class AdmHistoryPage implements OnInit {

  reference = [];
  refItems = firebase.database().ref('transaction');

  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
    public afdatabase: AngularFireDatabase, private router: Router) { }

  panelOpenState = false;

  ngOnInit() {
      this.refItems.on('value', resp => {
        this.reference = snapshotToArray(resp);
      });
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
