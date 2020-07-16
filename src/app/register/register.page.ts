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


export class checkFields {

}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  phoneNo = {} as Register;

  public tncAgreed: boolean = false;

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;

  constructor(public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  sentOTP() {
    
    var pNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    console.log('invoked')
    let fire = firebase.database().ref('/phoneNo/')
    fire.on('value', resp => {
      if (resp) {
        let item = resp
        item.forEach(element => {
          let obj = element.val()
          console.log(obj.number)
          if (obj.number == this.phoneNo.number) {
            this.router.navigate(['/login'])
            window.alert('duplicate')
          } else {
            this.afAuth.auth.signInWithPhoneNumber(pNumber, this.recaptchaVerifier).then((result) => {

              this.otpSent = true;
    
              this.phoneNumber = pNumber;
    
              this.confirmationResult = result;
              alert("OTP Sent!");
            })    
            
          }
        });
      }
    }
    )
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;

    this.confirmationResult.confirm(otp).then(() => {
      alert("OTP Verified!");
    }).catch(err => {
      alert(err);
    })

    this.afAuth.authState.subscribe(auth => {

      console.log(this.phoneNo)
      this.afDatabase.object(`phoneNo/${auth.phoneNumber}`).set(this.phoneNo).then(() => this.router.navigate(['/tabs/tab2'])

      )
    })


  }

  duplicate(num) {


  }




}
