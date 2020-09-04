import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CommitVendorReqPage } from '../commit-vendor-req/commit-vendor-req.page';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.page.html',
  styleUrls: ['./view-request.page.scss'],
})
export class ViewRequestPage implements OnInit {

  reference = [];
  refItems = firebase.database().ref('requestVen').orderByChild('status');
  avail = true;
  // tslint:disable-next-line: max-line-length

  constructor(public matExpansionModule: MatExpansionModule, private afDatabase: AngularFireDatabase,
    public alertController: AlertController, public afAuth: AngularFireAuth, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.refItems.on('value', resp => {
      this.reference = snapshotToArray(resp);
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.refItems.on('value', resp => {
      this.reference = snapshotToArray(resp);
    });

    this.checkAvail();
    console.log('Async operation has ended');
    event.target.complete();

  }

  checkAvail() {
    if (this.reference.length == 0) {
      console.log('true');
      this.avail = true;
    } else {
      console.log('false');
      this.avail = false;
    }
  }

  async openModalToWithdraw(key){
    const modal = await this.modalCtrl.create({
      component: CommitVendorReqPage,
      componentProps: {
        reqID: key
      }
    });
    return await modal.present();
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