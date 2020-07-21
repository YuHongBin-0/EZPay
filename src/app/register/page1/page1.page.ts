import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  get name() {
    return this.registrationForm.get("profile.name");
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get year() {
    return this.registrationForm.get('profile.year');
  }
  get class() {
    return this.registrationForm.get('profile.class');
  }
  get NRIC() {
    return this.registrationForm.get('profile.NRIC');
  }
  get balance() {
    return this.registrationForm.get('profile.balance');
  }
  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      
    ],
    class: [
      { type: 'required', message: 'Class name is required' },
      {
        type: 'maxlength',
        message: 'Class name cant be longer than 100 characters'
      }
    ],
    NRIC: [
      { type: 'required', message: 'NRIC is required' },
      {
        type: 'maxlength',
        message: 'NRIC cant be longer than 9 characters'
      }

    ],
    balance: [
      { type: 'required', message: 'Balance Amount is required' },
      {
        type: 'pattern',
        message: 'Please enter a valid Balance Amount'
      }
    ]
  };
  registrationForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        
      ]
    ],
    profile: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      class: ['', [Validators.required, Validators.maxLength(100)]],
      NRIC: ['', [Validators.required, Validators.maxLength(9)]],
      balance: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{0,4}[.][0-9]{0,2}$')]
      ]
    })
  });
  public submit() {
    console.log(this.registrationForm.value);
  }
  ngOnInit() {
  }
}
  


