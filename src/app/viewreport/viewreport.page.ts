import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.page.html',
  styleUrls: ['./viewreport.page.scss'],
})
export class ViewreportPage implements OnInit {

  infos = [];
  ref = firebase.database().ref('reports/');

  constructor(public matExpansionModule: MatExpansionModule, private afDatabase: AngularFireDatabase,) {

   }

  ngOnInit() { 
    this.ref.on('value', resp => {
    this.infos = snapshotToArray(resp);
  });
  }
  
  async deletePost(key) {
      await this.afDatabase.object(`reports/${key}/`).remove();
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

