import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { auth } from 'firebase/app'
import * as firebase from "firebase"
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
    if(password.length === 0){
      document.getElementById('passErrorEmpty').style.display = 'block';
    }
    if(cPass.length === 0){
      document.getElementById('cPassErrorEmpty').style.display = 'block';
    }
    else if (password !== cPass){
      var items:any = document.getElementsByClassName('errorFields');
      for (let i = 0; i < items.length; i++) {
          let element = items[i];
          element.style.display = "block";
      }
    }
    if(phoneNumber.length === 0){
      document.getElementById('phoneNumErrorEmpty').style.display = 'block';
    }
    if(fName.length === 0){
      document.getElementById('fNameErrorEmpty').style.display = 'block';
    }
    if(lName.length === 0){
      document.getElementById('lNameErrorEmpty').style.display = 'block';
    }
    else {
      
    }
  }
}
