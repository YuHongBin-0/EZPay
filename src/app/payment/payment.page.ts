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

function genUniqueID(id:string) {
  try{
    firebase.database().ref(`/transaction/${id}`).once('value').then(res => {
      var objFromDB = res.val();
      if(objFromDB != null){
        id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.genUniqueID(id);
      }
      else if(objFromDB == null){
        console.log('The reportID "' + id + '" does not exist');
        return id;
      }
    })
  }catch (error){
    console.log(error)
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss'],
})
export class PaymentPage implements OnInit {
  // scanActive = false;
  // scanResult = null;
  // @ViewChild('video', { static: false }) video: ElementRef;
  // @ViewChild('canvas', { static: false }) canvas: ElementRef;

  // videoElement: any;
  // canvasElement: any;
  // canvasContext: any;

  // loading: HTMLIonLoadingElement;

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

    // const stream = await navigator.mediaDevices.getUserMedia({
    //   video: { facingMode: 'environment'}
    // });
    // this.videoElement.srcObject = stream;
    // this.videoElement.setAttribute('playsinline', true);
    // this.videoElement.play();

    // this.loading = await this.loadingCtrl.create({});
    // await this.loading.present();

    // requestAnimationFrame(this.scan.bind(this));

    // -------------------

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

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    // this.videoElement = this.video.nativeElement;
    // this.canvasElement = this.canvas.nativeElement;
    // this.canvasContext = this.canvasElement.getContext('2d');
  }

  get notes() {
    return this.transactionForm.get("transaction.notes");
  }

  get amount() {
    return this.transactionForm.get('tranasaction.amount');
  }



  public errorMessages = {
    notes: [
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
     
    ],

    amount: [
      { type: 'required', message: 'Amount is required' },
      { type: 'pattern', message: 'Amount should not be over 100$' }
    ]
  }

  transactionForm = this.formBuilder.group({
    transaction: this.formBuilder.group({
      notes: ['', [ Validators.maxLength(100)]],
      
      amount: ['',[ Validators.required,Validators.pattern('^[0-9]{0,2}[.][0-9]{0,2}$')]],
    })
  });

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  // async scan(){
  //   console.log('SCAN');

  //   if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
  //     if (this.loading) {
  //       await this.loading.dismiss();
  //       this.loading = null;
  //       this.scanActive = true;
  //     }

  //     this.canvasElement.height = this.videoElement.videoHeight;
  //     this.canvasElement.width = this.videoElement.videoWidth;

  //     this.canvasContext.drawImage(
  //       this.videoElement,
  //       0,
  //       0,
  //       this.canvasElement.width,
  //       this.canvasElement.height
  //     );

  //     const imageData = this.canvasContext.getImageData(
  //       0,
  //       0,
  //       this.canvasElement.width,
  //       this.canvasElement.height
  //     );

  //     const code = jsQR(imageData.data, imageData.width, imageData.height, {
  //       inversionAttempts: 'dontInvert'
  //     });
  //     console.log('code: ', code);

  //     if (code) {
  //       this.scanActive = false;
  //       this.scanResult = code.data;

  //     } else {
  //       if (this.scanActive) {
  //         requestAnimationFrame(this.scan.bind(this));
  //       }
  //     }

  //   } else {
  //     requestAnimationFrame(this.scan.bind(this));
  //   }
  // }



  // reset() {
  //   this.scanResult = null;
  // }

  transactions() {
    var randomID;
    var transactionID;
    randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(randomID, transactionID);
    transactionID = genUniqueID(randomID);
    this.afDatabase.object(`transaction/${randomID}`).set(this.transaction)

    // this.afAuth.authState.subscribe(auth => {
    //   this.afDatabase.object(`transaction/${randomID}/to`).set(this.scanResult)
    // })

    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object(`transaction/${randomID}/to`).set(this.scannedCode)
    })

    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object(`transaction/${randomID}/from`).set(auth.uid)
    })

    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object(`transaction/${randomID}/fromName`).set(this.name)
    })

    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object(`transaction/${randomID}/transactionType`).set("payment(goods)")
    })
  }

  

}