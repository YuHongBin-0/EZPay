import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodItems } from '.././modals/foodItem';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {

  itemKey;
  userId = firebase.auth().currentUser.uid;
  refShop = firebase.database().ref('stalls');
  refItems = firebase.database().ref('products');
  targetStall; newProductKey; lastProductKey;
  shopDeets = [];
  shopItems = [];

  constructor(public afAuth: AngularFireAuth,
              public afdatabase: AngularFireDatabase,
              public alertController: AlertController,
              public router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.refShop.on('value', resp1 => {
      this.shopDeets = snapshotToArray(resp1);
      resp1.forEach(element => {
        const stall = element.val();
        if (stall.stallOwner == this.userId){
          stall.key = element.key
          this.targetStall = stall.key;
          console.log(stall, stall.stallOwner + " " + this.userId)
          console.log('itemBelongToStall: ' + this.targetStall)
        }
      });
    });
    this.refItems.on('value', resp2 => {
      this.shopItems = snapshotToArray(resp2);
      for (var i = 0; i < this.shopItems.length; i++){
        if (i == 0){
          var key = this.shopItems[i].key;
          this.lastProductKey = key;
          console.log('previousProductKey' + this.lastProductKey)
        }
      }
    });
  }

  // async getItemFromArray (array, getItem:string, compare:any) {
  //   var itemKey:string;
  //   array.forEach(element =>{
  //     if (element.owner == compare.toString()){
  //       itemKey = element.key;
  //       this.itemKey = itemKey;
  //     }
  //   }); return await this.itemKey
  // }

  get name() {
    return this.registrationForm.get('food.prodName');
  }
  get price() {
    return this.registrationForm.get('food.price');
  }
  get description() {
    return this.registrationForm.get('food.prodDesc');
  }

  food = {} as FoodItems;

  public errorMessages = {
    prodName: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' },
    ],
    price: [
      { type: 'required', message: 'Price is required' },
      {
        type: 'maxlength',
        message: 'Please enter a valid price'
      }
    ],
    prodDesc: [
      { type: 'required', message: 'Description is required' },
      {
        type: 'maxlength',
        message: 'Description cant be longer than 250 characters'
      }
    ],
  };
  registrationForm = this.formBuilder.group({

    food: this.formBuilder.group({
      prodName: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required]],
      prodDesc: ['', [Validators.required, Validators.maxLength(250)]],
    })
  });

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		});
		await alert.present();
  }

  getDigitsInNumber (number:number) {
    var digits;
    if (number >= 0 && number <= 9){
      digits = 1;
    }
    if (number >= 10 && number <= 99){
      digits = 2
    }
    if (number >= 100 && number <= 999){
      digits = 3
    }
    if (number >= 1000 && number <= 9999){
      digits = 4
    } return digits;
  }

  async addFood() {
    var appendedProdNumKey = "";
    var keyNumberVal = Number(this.lastProductKey.substr(this.lastProductKey.length - 4));
    keyNumberVal++;
    if (this.getDigitsInNumber(keyNumberVal) == 1){
      appendedProdNumKey = "000" + keyNumberVal;
    }
    if (this.getDigitsInNumber(keyNumberVal) == 2){
      appendedProdNumKey = "00" + keyNumberVal;
    }
    if (this.getDigitsInNumber(keyNumberVal) == 3){
      appendedProdNumKey = "0" + keyNumberVal;
    }
    if (this.getDigitsInNumber(keyNumberVal) == 4){
      appendedProdNumKey = keyNumberVal.toString();
    }
    this.newProductKey = 'prod_' + appendedProdNumKey;
    console.log('newProductKey: ' + this.newProductKey)
    this.afdatabase.object(`products/${this.newProductKey}/`).set(this.food);
    this.afdatabase.object(`products/${this.newProductKey}/stall`).set(this.targetStall)
    .then(()=>{
      this.router.navigate(['/tabs/tab4']);
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Adding New Food Items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: async () => {
            this.addFood();
          }
        }
      ]
    });
    await alert.present();
  }
}

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr.reverse();
};