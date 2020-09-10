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
  totalAmountInView : number;
  referenceLoaded = false;
  
  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
    public afdatabase: AngularFireDatabase, private router: Router) {
    }

  ngOnInit() { 
    this.listRef = firebase.database().ref('transactions');
    this.listRef.on('value', resp => {
      this.reference = snapshotToArray(resp)
      this.loadedReference = this.reference;
      this.getTotalAmountInView(this.loadedReference);
    })
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
      this.getTotalAmountInView(this.loadedReference);
      return;
    }

    this.loadedReference = this.loadedReference.filter((v) => {
      if (v.notes && q) {
        if (v.notes.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.recipientName.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.transactorName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.loadedReference.length);
    this.getTotalAmountInView(this.loadedReference);

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
    this.getTotalAmountInView(this.loadedReference);
  }

  sort() {
    if (this.sortDirection == 1){
      if(this.sortKey == "amount"){
        this.loadedReference.sort((a, b) => {
          if (a.amount < b.amount) return -1;
          if (a.amount > b.amount) return 1;
          return 0;
        });
      } else {
        this.loadedReference = this.loadedReference.sort((a,b) => {
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valA.localeCompare(valB);
        });
      }
    } else if (this.sortDirection == 2){
      if (this.sortKey == "amount"){
        this.loadedReference.sort((a, b) => {
          if (a.amount < b.amount) return 1;
          if (a.amount > b.amount) return -1;
          return 0;
        });
      }else{
        this.loadedReference = this.loadedReference.sort((a,b) => {
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valB.localeCompare(valA);
        });
      }
    } else {
      this.sortDirection = 0;
      this.doRefresh(event);
      this.loadedReference = this.reference;
      this.loadedReference.sort();
      this.sortKey = null;
    }
  }

  getTotalAmountInView(array){
    this.totalAmountInView = 0
    if(array.length != 0){
      this.referenceLoaded = true;
      array.forEach(element => {
        var elementAmt = element.amount;
        this.totalAmountInView = this.totalAmountInView + elementAmt
      })
    }
    console.log(this.totalAmountInView)
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
