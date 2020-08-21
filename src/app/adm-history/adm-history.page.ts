import { Component, OnInit, ViewChild } from '@angular/core';
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
  avail = true
  
  constructor(public matExpansionModule: MatExpansionModule, public afAuth: AngularFireAuth,
    public afdatabase: AngularFireDatabase, private router: Router) { 
      this.listRef = firebase.database().ref('transaction');
    this.listRef.on('value', resp => {
      let transaction = [];


      resp.forEach(course => {
        // console.log(course.val())
        let item = course.val();
        item.key = course.key;
        transaction.push(item);


      });
      this.reference = transaction;
      this.loadedReference = transaction.reverse();

    });
    }

   

  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 500);
  }

  initializeItems() {
    this.reference = this.loadedReference;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listRef.on('value', resp => {
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
        if (v.notes.toLowerCase().indexOf(q.toLowerCase()) > -1 ) {
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
