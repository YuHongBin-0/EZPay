import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodItems } from '.././modals/foodItem';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {

  constructor(public afAuth: AngularFireAuth,
              public afdatabase: AngularFireDatabase,
              public alertController: AlertController,
              public router: Router,
              private formBuilder: FormBuilder) { }

              get name() {
                return this.registrationForm.get('food.name');
              }
              get price() {
                return this.registrationForm.get('food.price');
              }
              get description() {
                return this.registrationForm.get('food.description');
              }

              food = {} as FoodItems;

              public errorMessages = {
                name: [
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
                description: [
                  { type: 'required', message: 'Description is required' },
                  {
                    type: 'maxlength',
                    message: 'Description cant be longer than 250 characters'
                  }

                ],
              };
              registrationForm = this.formBuilder.group({

                food: this.formBuilder.group({
                  name: ['', [Validators.required, Validators.maxLength(100)]],
                  price: ['', [Validators.required]],
                  description: ['', [Validators.required, Validators.maxLength(250)]],
                })
              });

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		});

		await alert.present();
  }


  async addFood() {


  this.afAuth.authState.subscribe(auth => {
      this.afdatabase.object(`testfood`).set(this.food).then(() => {this.router.navigate(['/tabs/tab4']); });

    });

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



            this.afAuth.authState.subscribe(auth => {
              this.afdatabase.object(`testfood`).set(this.food).then(() => {this.router.navigate(['/tabs/tab4']); });
        
            });

          }
        }
      ]
    });

    await alert.present();
  }

}