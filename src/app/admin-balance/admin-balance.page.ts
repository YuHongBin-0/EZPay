import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-admin-balance',
  templateUrl: './admin-balance.page.html',
  styleUrls: ['./admin-balance.page.scss'],
})
export class AdminBalancePage implements OnInit {

  targetUsrName = "";
  changeReason = "";
  userK;
  absoluteChange:boolean = false;
  changeValue:number=0; changeNotes:string = "";
  userKey: string;
  userName; userNRIC; userLevel; userClass; userBal; userStall; userRole;

  constructor(private route: ActivatedRoute, private router: Router, private afDatabase: AngularFireDatabase) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.userKey = this.router.getCurrentNavigation().extras.state.userK;
    //     console.log(this.userKey)
    //   }
    // }); 
  }

  ngOnInit() {
    firebase.database().ref('/users/' + this.userK).on('value', res => {
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

  async changeBalanceValue(action:string){
    var transactionID = await this.genUniqueID();

    firebase.database().ref(`users/${this.userK}`).once('value', resp => {
      var targetUserName = (resp.val() && resp.val().name)
      this.targetUsrName = targetUserName
    })

    this.afDatabase.object(`transaction/${transactionID}/to`).set(this.userK)
    this.afDatabase.object(`transaction/${transactionID}/from`).set("Admin Team")
    this.afDatabase.object(`transaction/${transactionID}/transactorName`).set("Admin Team")
    this.afDatabase.object(`transaction/${transactionID}/recipientName`).set(this.targetUsrName)
    this.afDatabase.object(`transaction/${transactionID}/transactionType`).set(this.changeReason)
    this.afDatabase.object(`transaction/${transactionID}/notes`).set(this.changeNotes)
    this.afDatabase.object(`transaction/${transactionID}/transactionDate`).set(new Date().toISOString())

    if (action == 'addTo'){
      firebase.database().ref('/users/' + this.userK).once('value', res => {
        if (res) {
          var bal:number = Number(res.val() && res.val().balance);
          var changedBal:number = Number(bal + this.changeValue)
          console.log('current balance: ' + bal, 'balance increment/decrement: ' + changedBal, 'final balance: ' + changedBal)
          this.afDatabase.object(`users/${this.userK}/balance`).set(changedBal);
          
          //update by amount increments
          this.afDatabase.object(`transaction/${transactionID}/amount`).set(this.changeValue)
          }
      });
    } else if (action == 'override'){
      firebase.database().ref('/users/' + this.userK).once('value', res => {
        if (res) {
          var bal:number = Number(res.val() && res.val().balance);
          var changedBal:number = this.changeValue;
          console.log('new balance: ' + changedBal, "transacted amount: " + trnsc_amount);
          this.afDatabase.object(`users/${this.userK}/balance`).set(changedBal);
          
          //calculate amount increment and add to transacted amount
          var trnsc_amount = changedBal - bal;
          this.afDatabase.object(`transaction/${transactionID}/amount`).set(trnsc_amount);
          }
      });
    }
  }
}
