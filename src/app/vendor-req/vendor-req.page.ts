import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorReq } from '.././modals/formven';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-vendor-req',
  templateUrl: './vendor-req.page.html',
  styleUrls: ['./vendor-req.page.scss'],
})
export class VendorReqPage implements OnInit {

  balance: number;
  name: string;
  class: string;
  role: string;
  NRIC: string;
  email: string;
  department: string;
  stallNo: string;


  constructor(public afAuth: AngularFireAuth,
    public afdatabase: AngularFireDatabase,
    public alertController: AlertController,
    public router: Router,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder) { }

  get amount() {
    return this.registrationForm.get('form.amount');
  }
  get notes() {
    return this.registrationForm.get('form.notes');
  }

  form = {} as VendorReq;

  public errorMessages = {
    amount: [
      { type: 'required', message: 'Requesting Amount is required' },
      { type: 'max', message: 'Amount cannot be more then your current balance' },

    ],
    notes: [
      { type: 'required', message: 'Notes is required' },
      {
        type: 'maxlength',
        message: 'Notes cant be longer than 250 characters'
      }

    ],
  };
  registrationForm = this.formBuilder.group({

    form: this.formBuilder.group({
      amount: ['', [Validators.required, Validators.max(Number(this.balance))]],
      notes: ['', [Validators.required, Validators.maxLength(250)]],
    })
  });

  ngOnInit() {
    const userId = firebase.auth().currentUser.uid;
    console.log(userId);

    firebase.database().ref('/users/' + userId).once('value').then(res => {
      const bal = (res.val() && res.val().balance);
      this.balance = bal;
      const disName = (res.val() && res.val().name);
      this.name = disName;
      const disClass = (res.val() && res.val().class);
      this.class = disClass;
      const disRole = (res.val() && res.val().role);
      this.role = disRole;
      const disNRIC = (res.val() && res.val().NRIC);
      this.NRIC = disNRIC;
      const disEmail = (res.val() && res.val().email);
      this.email = disEmail;
      const disDepartment = (res.val() && res.val().department);
      this.department = disDepartment;
      const disStallNo = (res.val() && res.val().stallNo);
      this.stallNo = disStallNo;

      console.log(this.name + ' has $' + this.balance);

    });
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  async submitForm() {
    this.afdatabase.object(`submitform`).set(this.form).then(() => { this.router.navigate(['/tabs/tab2']); });

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Confirm Request of : $ ' + this.form.amount + ' ?',
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
            let requestVenID: string;
            requestVenID = await this.genUniqueID();

            this.afAuth.authState.subscribe(auth => {
              this.afdatabase.object(`requestVen/${requestVenID}`).set(this.form).then(() => { this.router.navigate(['/tabs/tab2']); });
              this.afdatabase.object(`requestVen/${requestVenID}/requestorID`).set(auth.uid);
              this.afdatabase.object(`requestVen/${requestVenID}/currentBal`).set(this.balance);
              this.afdatabase.object(`requestVen/${requestVenID}/name`).set(this.name);
              this.afdatabase.object(`requestVen/${requestVenID}/NRIC`).set(this.NRIC);
              this.afdatabase.object(`requestVen/${requestVenID}/email`).set(this.email);
              this.afdatabase.object(`requestVen/${requestVenID}/status`).set('Pending');
              this.afdatabase.object(`requestVen/${requestVenID}/requested_date`).set(new Date().toISOString());
            });
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
    await firebase.database().ref(`/requestVen/${id}`).once('value').then(res => {
      let objFromDB = res.val();
      if (objFromDB != null) {
        console.log('The reportID "' + id + '" exists and CANNOT be used');
        this.genUniqueID();
      }
      else {
        console.log('The reportID "' + id + '" does not exist and is usable');
        finalID = id;
      }
    });
    return finalID;
  }
}