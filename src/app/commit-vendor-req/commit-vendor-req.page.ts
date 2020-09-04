import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-commit-vendor-req',
  templateUrl: './commit-vendor-req.page.html',
  styleUrls: ['./commit-vendor-req.page.scss'],
})
export class CommitVendorReqPage implements OnInit {

  reqID;
  reqName; reqUid; reqBal; reqDate; reqStatus;requested;
  targetUserId;

  constructor(public afDb: AngularFireDatabase, private alertCtrl: AlertController) { }

  ngOnInit() {
    if(this.reqID){
      firebase.database().ref(`requestVen/${this.reqID}`).on('value', res => {
        console.log(res)
        var requestorID = (res.val() && res.val().requestorID);
        this.targetUserId = requestorID;
        var requestorName = (res.val() && res.val().name);
        this.reqName = requestorName;
        var requestStat = (res.val() && res.val().status);
        this.reqStatus = requestStat;
        var requestDate = (res.val() && res.val().requested_date);
        this.reqDate = requestDate;
        var reqUserBal = (res.val() && res.val().currentBal);
        this.reqBal = reqUserBal;
        var requestedAmt = (res.val() && res.val().amount);
        this.requested = requestedAmt;
      })
    }
  }

  async finaliseWithdrawal(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Commit to Withdrawal Request',
      message: 'Please make sure the payment has been made properly before committing to these changes',
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
            var finalUserBalance:number = Number(this.reqBal - this.requested);

            this.afDb.object(`requestVen/${this.reqID}/status`).set("Paid");
            this.afDb.object(`requestVen/${this.reqID}/resolve_date`).set(new Date().toISOString());
            this.afDb.object(`users/${this.targetUserId}/balance`).set(finalUserBalance);
          }
        }
      ]
    });
    await alert.present();
  }

}
