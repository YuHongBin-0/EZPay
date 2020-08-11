import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  

  shopDeets = [];
  shopItems = [];
  refShop = firebase.database().ref('stalls');
  refItems = firebase.database().ref('products');



  constructor(public matExpansionModule: MatExpansionModule  ) { }
  ngOnInit() { 

    var stall;
    this.refShop.on('value', resp => {
      this.shopDeets = snapshotToArray(resp);
    });
    this.refItems.on('value', resp1 => {
      this.shopItems = snapshotToArray(resp1);
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



