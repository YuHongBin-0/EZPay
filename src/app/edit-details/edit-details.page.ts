import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {

  absoluteChange:boolean = false;
  userComponent: string;
  changeValue:number;
  changeNotes: string;
  userKey: string;
  userName; userNRIC; userLevel; userClass; userBal; userStall; userRole;

  constructor(private route: ActivatedRoute, private router: Router, private afDatabase: AngularFireDatabase) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userComponent = this.router.getCurrentNavigation().extras.state.userComp;
        this.userKey = this.router.getCurrentNavigation().extras.state.userK;
        console.log(this.userKey)
      }
    });
  }
  ngOnInit() {
    firebase.database().ref('/users/' + this.userKey).on('value', res => {
      console.log(res)
      var bal = (res.val() && res.val().balance);
      this.userBal = bal;
      var disName = (res.val() && res.val().name);
      this.userName = disName;
      var disClass = (res.val() && res.val().class);
      this.userClass = disClass;
      var disNRIC = (res.val() && res.val().NRIC);
      this.userNRIC = disNRIC;
      var disStallNo = (res.val() && res.val().stallNo);
      this.userStall = disStallNo;
      var role = (res.val() && res.val().stallNo);
      this.userRole = role;
    })
  }
  incrementValue(){
    if(this.changeValue == null ){
      this.changeValue = 1;
    }else {
      this.changeValue++;
      this.changeValue = +this.changeValue.toFixed(2);
    }
  }
  decrementValue(){
    if(this.changeValue == null){
      this.changeValue = -1;
    }else {
      this.changeValue--;
      this.changeValue = +this.changeValue.toFixed(2);
    }
  }

  async genUniqueID() {
    var id:string;
    var finalID:string;
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("initial id is: " + id)
    await firebase.database().ref(`/reports/${id}`).once('value').then(res => {
      var objFromDB = res.val();
      if(objFromDB != null){
        console.log('The reportID "' + id + '" exists and CANNOT be used');
        this.genUniqueID();
      }
      else{
        console.log('The reportID "' + id + '" does not exist and is usable');
        finalID = id;
      }
    });
    return finalID;
  }

  async changeBalanceValue(){
    var transactionID = await this.genUniqueID();
    firebase.database().ref('/users/' + this.userKey).once('value', res => {
      if (res) {
        var bal:number = Number(res.val() && res.val().balance);
        console.log('student balance: ' + bal);
        console.log('change balance: ' + this.changeValue)
        var changedBal:number = Number(bal + this.changeValue)
        console.log('final balance: ' + changedBal)
        this.afDatabase.object(`users/${this.userKey}/balance`).set(changedBal);
        
        }
    });

    this.afDatabase.object(`transaction/${transactionID}/amount`).set(this.changeValue)
    this.afDatabase.object(`transaction/${transactionID}/to`).set(this.userKey)
    this.afDatabase.object(`transaction/${transactionID}/from`).set("Admin Team")
    this.afDatabase.object(`transaction/${transactionID}/transactionType`).set("Balance Changes")
    this.afDatabase.object(`transaction/${transactionID}/notes`).set(this.changeNotes)
  }
}