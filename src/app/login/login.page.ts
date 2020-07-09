import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from "firebase"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public password: string;
  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;

  constructor (public af :AngularFireAuth){}

  ngOnInit() {
  }

  // loginUser(){
  //   const {phoneNumber, password} = this;
  //   try {
  //     this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size': 'invisible'});
  //   }catch(err){
  //     console.dir(err)
  //     if(err.code === "auth/user-not-found"){
        
  //     }else{

  //     }
  //   }
  // }
}
