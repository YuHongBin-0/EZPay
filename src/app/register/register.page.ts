import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { auth } from 'firebase/app'
import * as firebase from "firebase"
import { isEmptyExpression } from '@angular/compiler';
import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { AngularFireDatabase } from 'angularfire2/database'

import { Tab2PageRoutingModule } from "../tab2/tab2-routing.module";
import { Router } from '@angular/router'
import { Register } from '../modals/register';  


export class checkFields{
  
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register = { } as Register;

  public tncAgreed:boolean = false;

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;

  constructor(public afAuth :AngularFireAuth, private afDatabase: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size': 'invisible'});
  }

  sentOTP(){
    var pNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    this.afAuth.auth.signInWithPhoneNumber(pNumber, this.recaptchaVerifier).then((result) => {


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

    this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object(`users/${auth.uid}`).set(this.register).then(() => this.router.navigate(['/tabs/tab1'])

    )
  })


  }
  


}
