import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration,  PayPalPaymentDetails} from '@ionic-native/paypal/ngx';
import { LockPage } from '../lock/lock.page';


@Component({
  selector: 'app-payven',
  templateUrl: './payven.page.html',
  styleUrls: ['./payven.page.scss'],
})
export class PayvenPage implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private payPal: PayPal, public navCtrl: NavController,
    private modalCtrl: ModalController) { }

  get amount() {
    return this.paymentForm.get('amount');
  }

  public errorMessages = {
    amount: [
      { type: 'required', message: 'Amount is required' },
      {
        type: 'pattern',
        message: 'Please enter a valid Amount'
      }
    ]
  };

  paymentForm = this.formBuilder.group({
    amount: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{0,4}[.][0-9]{0,2}$')]
    ]
  });

  public submit() {
    console.log(this.paymentForm.value);
  }

  ngOnInit() {
    this.lockApp();
  }

  comprar(){
   
    this.payPal.init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: 'AaNXnIekCWi3e01oPBykVliGefhusOSg_FQlEqlJt19gu1s2MonMSPSzd--JY3n2xK5Nt8k869154RMQ'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: true,
        merchantName: 'CanalDoAbranches',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''
      })).then(() => {
        const detail = new PayPalPaymentDetails('19.99', '0.00', '0.00');
        const payment = new PayPalPayment('19.99', 'BRL', 'CanalDoAbranches', 'Sale', detail);
        this.payPal.renderSinglePaymentUI(payment).then((response) => {
          window.alert('payment made');
        }, () => {
          window.alert('failed to render paypal payment');
        });
      });
    });
  }


  async lockApp(){
    const modal = await this.modalCtrl.create({
      component: LockPage,
      backdropDismiss: false,
      cssClass: 'lock-modal',
      componentProps: {
        isModal: true
      }
    });
    modal.present();
  }

}
