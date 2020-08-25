import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailComposer} from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public router: Router, public emailCom: EmailComposer) { }

  ngOnInit() {
  }

  openProfile() {

    this.router.navigate(['/profile']);

  }

  openReport() {

    this.router.navigate(['/report']);

  }

  openEmailCom(){
    
     
    let email = {
      to: 'AdminTeam@tp.edu.sg',
      subject: 'TP Admin Teams',
      body: 'Text',
      isHtml: true
    };
    
    // Send a text message using default options
    this.emailCom.open(email);
 }



}
