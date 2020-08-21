import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
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
  reference2 = [];
  refItems = firebase.database().ref('transaction');

  avail = true
  emptysearch: string;
  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
    public afdatabase: AngularFireDatabase, private router: Router) { }

  panelOpenState = false;

  ngOnInit() {
    this.refItems.on('value', resp => {
      this.reference = snapshotToArray(resp);
    });

    this.reference2 = this.reference.reverse();
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

  initializeItems() {
    this.reference = this.reference2;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.reference = this.reference.filter((v) => {
      if (v.notes && q) {
        if (v.notes.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.reference.length);

    if (this.reference.length == 0) {
      this.emptysearch = "empty liao"  // equivalent to true or present
      console.log("true")
    } else {
      this.emptysearch = "" // equivalent to false or empty
      console.log("false")
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
