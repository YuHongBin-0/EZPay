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
  id = this.afDatabase.object(`reports/`)
  ref = firebase.database().ref('reports/');
  constructor(public matExpansionModule: MatExpansionModule, private afDatabase: AngularFireDatabase,) { }

  ngOnInit() { 
    this.ref.on('value', resp => {
    this.infos = snapshotToArray(resp);
  });

  }

  async deletePost(infos: string) {
    console.log(this.infos);
     var id = this.afDatabase.object(`reports/`)
    await this.afDatabase.object(`reports/${infos}/`).remove();

  }

}

export const snapshotToArray = snapshot => {  // for heroes
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};

