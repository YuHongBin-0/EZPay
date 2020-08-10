import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database'
import { ShopItemService } from '../services/shop-item.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  infos = [];
  // infos1 = [];
  ref = firebase.database().ref('stallItem/');

 
  
  // ref1 = firebase.database().ref('stallItem/goods');
  constructor(public matExpansionModule: MatExpansionModule ,private fetch: ShopItemService ) { }

  ngOnInit() { 
    this.ref.on('value', resp => {
    this.infos = snapshotToArray(resp);
  });

  console.log(this.ref)

 

  // this.ref1.on('value', resp => {
  //   this.infos1 = snapshotToArray1(resp);
  // });

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

// export const snapshotToArray1 = snapshot => {  
//   const returnArr = [];

//   snapshot.forEach(childSnapshot => {
//     const item = childSnapshot.val();
//     item.key = childSnapshot.key;
//     returnArr.push(item);
//   });

//   return returnArr.reverse();
// };