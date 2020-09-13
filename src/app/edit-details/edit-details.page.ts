import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {

  userK;
  userKey: string;
  userName; userNRIC; userLevel; userClass; userBal; userStall; userRole; userDept; userEmail;
  // newName; newNRIC; newLevel; newClass; newStall; newDept; newEmail;

  constructor(private router: Router, private afDatabase: AngularFireDatabase, private modalCtrl: ModalController) {}

  ngOnInit() {
    firebase.database().ref(`users/${this.userK}`).on('value', res => {
      console.log(res)
      var email = (res.val() && res.val().email);
      this.userEmail = email;
      var name = (res.val() && res.val().name);
      this.userName = name;
      var uClass = (res.val() && res.val().class);
      this.userClass = uClass;
      var NRIC = (res.val() && res.val().NRIC);
      this.userNRIC = NRIC;
      var stall_no = (res.val() && res.val().stallNo);
      this.userStall = stall_no;
      var role = (res.val() && res.val().role);
      this.userRole = role;
      var dept = (res.val() && res.val().department);
      this.userDept = dept;
      console.log('name: ' + name, 'nric: ' + this.userNRIC, 'email: ' + this.userEmail, 'level: ' + this.userLevel, 'class: ' + this.userClass, 'role: ' + this.userRole, 'stall number: ' + this.userStall, 'dept: ' + this.userDept);
    })
  }

  updateUserDetails(field:string){
    if (field == 'nric'){
      this.afDatabase.object(`users/${this.userK}/NRIC`).set(this.userNRIC);
    }if (field == 'name'){
      this.afDatabase.object(`users/${this.userK}/name`).set(this.userName);
    }if (field == 'class'){
      this.afDatabase.object(`users/${this.userK}/class`).set(this.userClass);
    }if (field == 'level'){
      this.afDatabase.object(`users/${this.userK}/level`).set(this.userLevel);
    }if (field == 'email'){
      this.afDatabase.object(`users/${this.userK}/email`).set(this.userEmail);
    }if (field == 'number'){
      
    }if (field == 'stall-no'){
      this.afDatabase.object(`users/${this.userK}/stallNo`).set(this.userStall);
    }if (field == 'department'){
      this.afDatabase.object(`users/${this.userK}/department`).set(this.userDept);
    }
  }

  deleteUser(){
    this.afDatabase.object(`users/${this.userK}`).remove();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}