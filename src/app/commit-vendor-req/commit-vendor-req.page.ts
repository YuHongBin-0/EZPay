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
  targetUserId; targetUsrName;

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
            this.doWithdraw();
          }
        }
      ]
    });
    await alert.present();
  }

  async doWithdraw() {
    var finalUserBalance:number = Number(this.reqBal - this.requested);
    var date = new Date().toISOString()
    this.afDb.object(`requestVen/${this.reqID}/status`).set("Paid");
    this.afDb.object(`requestVen/${this.reqID}/resolveDate`).set(date);
    this.afDb.object(`users/${this.targetUserId}/balance`).set(finalUserBalance);

    var transactionID = 'WTHDR-' + await this.genUniqueID()
    firebase.database().ref(`users/${this.targetUserId}`).once('value', resp => {
      var targetUserName = (resp.val() && resp.val().name)
      this.targetUsrName = targetUserName

      this.afDb.object(`transactions/${transactionID}/to`).set(this.targetUserId)
      this.afDb.object(`transactions/${transactionID}/from`).set("Admin Team")
      this.afDb.object(`transactions/${transactionID}/transactorName`).set("Admin Team")
      this.afDb.object(`transactions/${transactionID}/recipientName`).set(this.targetUsrName)
      this.afDb.object(`transactions/${transactionID}/transactionType`).set("Withdrawal Request")
      this.afDb.object(`transactions/${transactionID}/notes`).set("Your withdrawal request has been approved")
      this.afDb.object(`transactions/${transactionID}/transactionDate`).set(date)
  
      var transactedAmt = -this.requested 
      this.afDb.object(`transactions/${transactionID}/amount`).set(transactedAmt)
    })
  }

  async genUniqueID() {
    var id:string;
    var finalID:string;
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("initial id is: " + id)
    await firebase.database().ref(`/transactions/${id}`).once('value').then(res => {
      var objFromDB = res.val();
      if(objFromDB != null){
        console.log('The transactionID "' + id + '" exists and CANNOT be used');
        this.genUniqueID();
      }
      else{
        console.log('The transactionID "' + id + '" does not exist and is usable');
        finalID = id;
      }
    });
    return finalID;
  }
}
