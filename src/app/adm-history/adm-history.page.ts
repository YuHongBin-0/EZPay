import { Component, OnInit, ViewChild, Optional } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-adm-history',
  templateUrl: './adm-history.page.html',
  styleUrls: ['./adm-history.page.scss'],
})

export class AdmHistoryPage implements OnInit {
  @ViewChild('autofocus', { static: false }) myInput: IonSearchbar;
  public reference: Array<any>;
  public loadedReference: Array<any>;
  public listRef: firebase.database.Reference;
  emptysearch: string;
  avail = true;
  sortDirection = 0;
  sortKey = null;
  initialSortKey = null;
  
  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
    public afdatabase: AngularFireDatabase, private router: Router) {
    }

  ngOnInit() { 
    this.listRef = firebase.database().ref('transaction');
    this.listRef.on('value', resp => {
      this.reference = snapshotToArray(resp)
    });
  }

  initializeItems() {
    this.loadedReference = this.reference;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listRef.on('value', resp => {
      this.reference = snapshotToArray(resp);
      this.loadedReference = this.reference;
    });

    this.checkAvail();
    console.log('Async operation has ended');
    event.target.complete();
  }

  checkAvail() {
    if (this.loadedReference.length == 0) {
      console.log('true')
      this.avail = true
    } else {
      console.log('false')
      this.avail = false
    }
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

    this.loadedReference = this.loadedReference.filter((v) => {
      if (v.notes && q) {
        if (v.notes.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.from.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.to.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.loadedReference.length);

    if (this.loadedReference.length == 0) {
      this.emptysearch = "empty liao"  // equivalent to true or present
      console.log("true")
    } else {
      this.emptysearch = "" // equivalent to false or empty
      console.log("false")
    }
  }

  sortBy(key:string){
    this.sortKey = key;
    if (this.initialSortKey == null){
      console.log(this.sortKey,this.initialSortKey);
      this.initialSortKey = key;
    } else if (this.sortKey != this.initialSortKey){
      console.log(this.sortKey,this.initialSortKey);
      this.sortDirection = 0;
      this.initialSortKey = key;
    }
    this.sortDirection++;
    this.sort();
  }

  sort() {
    if (this.sortDirection == 1){
      this.loadedReference = this.loadedReference.sort((a,b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2){
      this.loadedReference = this.loadedReference.sort((a,b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection = 0;
      this.doRefresh(event);
      this.loadedReference = this.reference;
      this.loadedReference.sort();
      this.sortKey = null;
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
