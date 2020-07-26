import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-payven',
  templateUrl: './payven.page.html',
  styleUrls: ['./payven.page.scss'],
})
export class PayvenPage implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

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
  }

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
  }

}
