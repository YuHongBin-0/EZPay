import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.page.html',
  styleUrls: ['./viewreport.page.scss'],
})
export class ViewreportPage implements OnInit {

  infos = [];
  ref = firebase.database().ref('reports/');

  // tslint:disable-next-line: max-line-length
  constructor(public matExpansionModule: MatExpansionModule, private afDatabase: AngularFireDatabase,
              public alertController: AlertController) {

   }

  ngOnInit() {
    this.ref.on('value', resp => {
    this.infos = snapshotToArray(resp);
  });
  }

  async presentAlertConfirm(key) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Changed to Solve',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: async () => {
            await this.afDatabase.object(`reports/${key}/`).remove();
          }
        }
      ]
    });

    await alert.present();
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

