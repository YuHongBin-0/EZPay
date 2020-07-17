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
  cPass: string;
  password: string;
  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber:string="";
  protectedPhoneNumber:string = "+65 **** " + this.phoneNumber.substr(this.phoneNumber.length - 4);

  constructor(public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  sentOTP() {
    var extractednum = (<HTMLInputElement>document.getElementById("phoneNumber")).value.toString();
    // var pNumber = '+65' + extractednum;
    var pNumber = extractednum;
    console.log('invoked')
    let fire = firebase.database().ref('/phoneNo/')
    fire.on('value', resp => {
      if (resp) {
        var isDuplicate = false;
        var snapshotchildcount = 0;
        var index = 0;
        let counter = resp
        counter.forEach(element =>{
          snapshotchildcount = snapshotchildcount + 1;
        })
        let item = resp
        item.forEach(element  => {
          let obj = element.val()
          console.log(obj.number + " at index:" + index + ". snapshotchildcount = " + snapshotchildcount)
          index = index + 1 ;
          if (obj.number == this.phoneNo.number) {
            window.alert('duplicate')
            isDuplicate = true;
          }
          if (index === (snapshotchildcount - 1) && (isDuplicate === false)){
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
  registerAccount(){
    // if (this.cPass !== this.password){
    //   var items:any = document.getElementsByClassName('passwordsUnmatched');
    //   for (let i = 0; i < items.length; i++) {
    //       let element = items[i];
    //       element.style.visibility = "visible";
    //   }
    // }
    // if (this.cPass === this.password){
    //   var items:any = document.getElementsByClassName('passwordsUnmatched');
    //   for (let i = 0; i < items.length; i++) {
    //       let element = items[i];
    //       element.style.visibility = "collapse";
    //   }
      this.sentOTP();
    // }
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
