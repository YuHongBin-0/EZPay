import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import jsQR from 'jsqr';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { Observable } from 'rxjs';
import { Transaction } from '../modals/transaction';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss'],
})
export class PaymentPage implements OnInit {
 





  userID = firebase.auth().currentUser.uid;;

  transaction = {} as Transaction;

  name: string;

  constructor(private loadingCtrl: LoadingController, 
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    public alertController: AlertController,
    public router: Router,
    private formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner) {}

    scannedCode = null;

  async ngOnInit() {


    this.barcodeScanner.scan().then(
      barcodeData =>{
        this.scannedCode = barcodeData.text;
      }
    )

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {
      
      var disName = (res.val() && res.val().name);
      this.name = disName;
  })
}



  get notes() {
    return this.transactionForm.get("transaction.notes");
  }

  get amount() {
    return this.transactionForm.get('transaction.amount');
  }

  public errorMessages = {
    notes: [
      { type: 'maxlength', message: 'Note should not be longer than 100 characters' }
    ],
    amount: [ 
      { type: 'required', message: 'Amount is required' },
      { type: 'max', message: 'Maximum amount per transaction should not exceed $20' }]
  }

  transactionForm = this.formBuilder.group({
    transaction: this.formBuilder.group({
      notes: ['', [ Validators.maxLength(100)]],
      amount: ['', [Validators.required, Validators.max(20)]],
    })
  });

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
      buttons: ['Ok']
		})
		await alert.present()
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
            var transactionID: string;
            
            transactionID = await this.genUniqueID();
            
            firebase.database().ref('/users/' + this.scannedCode).once('value').then(res => {
              if (res) {
                var bal:number = (res.val() && res.val().balance);
                var changedBal:number = Number(bal + this.transaction.amount);
               
                this.afDatabase.object(`users/${this.scannedCode}/balance`).set(changedBal);
                
               }
            });
            firebase.database().ref('/users/' + this.userID).once('value').then(res => {
              if (res) {
                var bal:number = (res.val() && res.val().balance);
                
                this.afDatabase.object(`users/${this.userID}/balance`).set(bal - this.transaction.amount);
                }
            });
            this.afDatabase.object(`transaction/${transactionID}`).set(this.transaction)
            this.afDatabase.object(`transaction/${transactionID}/to`).set(this.scannedCode)
            this.afAuth.authState.subscribe(auth => {
              this.afDatabase.object(`transaction/${transactionID}/from`).set(auth.uid)
            })
            this.afDatabase.object(`transaction/${transactionID}/transactionType`).set("payment(goods)")
            
            this.router.navigate(['tabs/tab2'])
            this.presentAlert('Success', 'Payment Made!')
          }
        }
      ]
    });

    await alert.present();
  }

  



  async genUniqueID() {
    var id:string;
    var finalID:string;
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("initial id is: " + id)
    await firebase.database().ref(`/reports/${id}`).once('value').then(res => {
      var objFromDB = res.val();
      if(objFromDB != null){
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

//   async transactions() {
//     var transactionID: string;
//     transactionID = await this.genUniqueID();

    
//     firebase.database().ref('/users/' + this.scanResult).once('value').then(res => {
//       if (res) {
//         var bal:number = (res.val() && res.val().balance);
//         var changedBal:number = Number(bal + this.transaction.amount);
//         console.log('vendor balance: ' + bal);
//         this.afDatabase.object(`users/${this.scanResult}/balance`).set(changedBal);
//         console.log('bal: ' + bal);
//         console.log('this.transaction.amount: ' + this.transaction.amount);
//         console.log('changedBal: ' + changedBal);
//        }
// });

// firebase.database().ref('/users/' + this.userID).once('value').then(res => {
//       if (res) {
//         var bal:number = (res.val() && res.val().balance);
//         console.log('student balance: ' + bal);
//         this.afDatabase.object(`users/${this.userID}/balance`).set(bal - this.transaction.amount);
//        }
// });
    
//     this.afDatabase.object(`transaction/${transactionID}`).set(this.transaction)
//     this.afDatabase.object(`transaction/${transactionID}/to`).set(this.scanResult)
//     this.afAuth.authState.subscribe(auth => {
//       this.afDatabase.object(`transaction/${transactionID}/from`).set(auth.uid)
//     })
//     this.afDatabase.object(`transaction/${transactionID}/transactionType`).set("payment(goods)")
//   }
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

