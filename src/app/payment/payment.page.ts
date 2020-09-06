import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import jsQR from 'jsqr';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, NavigationExtras } from '@angular/router';
import * as firebase from 'firebase/app';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { Observable } from 'rxjs';
import { Transaction } from '../modals/transaction';
import { FormBuilder, Validators } from '@angular/forms';
import { LockPage } from '../lock/lock.page';


@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private loadingCtrl: LoadingController,
              private afAuth: AngularFireAuth,
              private modalCtrl: ModalController,
              private afDatabase: AngularFireDatabase,
              public alertController: AlertController,
              public router: Router,
              private formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner) {}



  get notes() {
    return this.transactionForm.get('transaction.notes');
  }

  get amount() {
    return this.transactionForm.get('transaction.amount');
  }


  targetUserNameFrom; targetUserNameTo;

  reference = [];
  refStalls = firebase.database().ref('stalls');

  userID = firebase.auth().currentUser.uid;

  transaction = {} as Transaction;

  pAmount = {
    amount: this.transaction.amount,
    time: this.transaction.date,
  };

  name: string;

    scannedCode = null;

  public errorMessages = {
    notes: [
      { type: 'maxlength', message: 'Note should not be longer than 100 characters' }
    ],
    amount: [
      { type: 'required', message: 'Amount is required' },
      { type: 'max', message: 'Maximum amount per transaction should not exceed $20' }]
  };

  transactionForm = this.formBuilder.group({
    transaction: this.formBuilder.group({
      notes: ['', [ Validators.maxLength(100)]],
      amount: ['', [Validators.required, Validators.max(20)]],
    })
  });

  openDetailsWithQueryParams(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.pAmount)
      }
    };
    this.router.navigate(['second'], navigationExtras);
  }


  async ngOnInit() {

    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text.toString();
      }
    );

    const userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {

      const disName = (res.val() && res.val().name);
      this.name = disName;
  });

    this.refStalls.on('value', resp => {
    this.reference = snapshotToArray1(resp);
  });
}

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
      buttons: ['Ok'],
      cssClass: 'payment-alert',
		});
		await alert.present();
  }

  tryTransactNow() {
    this.presentAlertConfirm().then(() => {
      this.lockApp();
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Payment',
      message: 'Payment of $' + this.transaction.amount + ' , confirm??',
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
            this.transactions();
          }
        }
      ]
    });

    await alert.present();
  }

  async genUniqueID() {
    let id: string;
    let finalID: string;
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log('initial id is: ' + id);
    await firebase.database().ref(`/transaction/${id}`).once('value').then(res => {
      const objFromDB = res.val();
      if (objFromDB != null){
        console.log('The reportID "' + id + '" exists and CANNOT be used');
        this.genUniqueID();
      }
      else{
        console.log('The reportID "' + id + '" does not exist and is usable');
        finalID = id;
      }
    });
    return finalID;
  }

  async transactions(){
    let transactionID: string;

    transactionID = await this.genUniqueID();
    transactionID = 'TRNSC-' + transactionID;
    firebase.database().ref('/users/' + this.scannedCode).once('value').then(res => {
      if (res) {
        const bal: number = (res.val() && res.val().balance);
        const changedBal: number = Number(bal + this.transaction.amount);

        this.afDatabase.object(`users/${this.scannedCode}/balance`).set(changedBal);

      }
    });
    firebase.database().ref('/users/' + this.userID).once('value').then(res => {
      if (res) {
        const bal: number = (res.val() && res.val().balance);
        this.targetUserNameFrom = (res.val() && res.val().name);
        this.afDatabase.object(`users/${this.userID}/balance`).set(bal - this.transaction.amount);
        }
    });
    firebase.database().ref('users/' + this.scannedCode).once('value', resp => {
      this.targetUserNameTo = (resp.val() && resp.val().name);
    });
    this.afDatabase.object(`transaction/${transactionID}`).set(this.transaction);
    this.afDatabase.object(`transaction/${transactionID}/to`).set(this.scannedCode);
    this.afDatabase.object(`transaction/${transactionID}/from`).set(this.userID);
    this.afDatabase.object(`transaction/${transactionID}/transactorName`).set(this.targetUserNameFrom);
    this.afDatabase.object(`transaction/${transactionID}/recipientName`).set(this.targetUserNameTo);
    this.afDatabase.object(`transaction/${transactionID}/transactionDate`).set(new Date().toISOString());
    this.afDatabase.object(`transaction/${transactionID}/transactionType`).set('Payment (Goods)');

    this.router.navigate(['success']);
  }

  async lockApp(){
    const modal = await this.modalCtrl.create({
      component: LockPage,
      backdropDismiss: false,
      cssClass: 'lock-modal',
      componentProps: {
        isModal: true
      }
    });
    modal.present();
  }
}

export const snapshotToArray1 = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};
