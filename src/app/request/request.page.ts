import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from "firebase"

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;

  constructor(private modalController: ModalController, public af :AngularFireAuth) {

  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size': 'invisible'});
  }

  sentOTP(){
    var pNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    this.af.auth.signInWithPhoneNumber(pNumber, this.recaptchaVerifier).then((result) => {

      this.otpSent = true;

      this.phoneNumber = pNumber;

      this.confirmationResult = result;
      alert("OTP Sent!");
    

    }).catch(err =>{
      alert(err);
    })
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;

    this.confirmationResult.confirm(otp).then(() => {
      alert("OTP Verified!");
    }).catch(err =>{
      alert(err);
    })
  }


  async closeModal() {
    await this.modalController.dismiss();
  }



}
