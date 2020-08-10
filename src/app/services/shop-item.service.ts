import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {

   infos: any[] = [];
   foodName: any[] = [];
   foodImage: any[] = [];
   foodDes: any[] = [];
   foodPrice: any[] = [];

  constructor() { }

  fetchData(key) {
    this.infos = []
    this.foodName = [];
    this.foodImage = [];
    this.foodDes = [];
    this.foodPrice = [];
    

    console.log(key + " " + "service")

    firebase.database().ref('shopItem/' + key).on('value', resp => {
      this.infos = snapshotToObject(resp);
      let item = resp.val();


      this.infos = item  // more efficient 
      this.foodName = item.goods.name
      this.foodImage = item.goods.image
      this.foodDes = item.goods.description
      this.foodPrice = item.goods.price
    }
    );
  }
}
export const snapshotToObject = snapshot => { // for specific hero
  let item = snapshot.val();
  item.key = snapshot.key;
  return item;

}
