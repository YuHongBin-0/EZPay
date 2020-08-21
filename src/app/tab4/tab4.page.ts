import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  shopDeets = [];
  shopItems = [];
  refShop = firebase.database().ref('stalls');
  refItems = firebase.database().ref('products');
  userId = firebase.auth().currentUser.uid;
  

  constructor(public router: Router, public matExpansionModule: MatExpansionModule, private afDatabase: AngularFireDatabase ) { }

  ngOnInit() {

    this.refShop.on('value', resp => {
      this.shopDeets = snapshotToArray(resp);
    });
    this.refItems.on('value', resp1 => {
      this.shopItems = snapshotToArray(resp1);
    });
  }
  

  addFoodItems() {
    this.router.navigate(['/add-items']);
  }

  async deleteFood(key){
    await this.afDatabase.object(`products/${key}/`).remove()
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


