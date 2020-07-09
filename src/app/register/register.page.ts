import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { auth } from 'firebase/app'
import * as firebase from "firebase"
import { isEmptyExpression } from '@angular/compiler';
import { fingerprint } from '@angular/compiler/src/i18n/digest';

export class checkFields{
  
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public tncAgreed:boolean = false;
  phoneNumber: string;
  password: string;
  cPass: string;
  fName: string;
  lName: string;

  constructor(public af: AngularFireAuth) { }

  ngOnInit() {
    
  }
  

  async registerAccount(){
    const {phoneNumber, password, cPass, fName, lName} = this;
    // this.com   pareFields(password, cPass, 'passwordUnmatched');
    // this.checkIfEmpty(password, 'passErrorEmpty');
    // this.checkIfEmpty(cPass, 'cPassErrorEmpty');
    // this.checkIfEmpty(fName,'fNameErrorEmpty');
    // this.checkIfEmpty(lName,'lNameErrorEmpty');
    // this.checkIfEmpty(phoneNumber,'phoneNumErrorEmpty');
    if (password !== cPass){
      var items:any = document.getElementsByClassName('passwordUnmatched');
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.style.visibility = "visible";
      }
    }
    if(password === cPass){
      var items:any = document.getElementsByClassName('passwordUnmatched');
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.style.visibility = "hidden";
      }
    }else{

    }
  }
  registerForm(){
    
  }
  // compareFields(val1,val2,commonClass: string) {
  //   if(val1 !== val2){
    //   var items:any = document.getElementsByClassName(commonClass);
    //   for (let i = 0; i < items.length; i++) {
    //       let element = items[i];
    //       element.style.visibility = "visible";
    //   }
    // }
  //   if(val1 === val2){
  //     var items:any = document.getElementsByClassName(commonClass);
  //     for (let i = 0; i < items.length; i++) {
  //         let element = items[i];
  //         element.style.visibility = "hidden";
  //     }
  //   }
  // }
  // checkIfEmpty(variable, htmlID: string){
  //   if(variable.length === 0){
  //     document.getElementById(htmlID).style.visibility = 'visible';
  //   }
  //   if(variable.length !== 0){
  //     document.getElementById(htmlID).style.visibility = 'hidden';
  //   }
  // }
}
