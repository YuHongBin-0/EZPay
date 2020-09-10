import { Component, OnInit } from '@angular/core';
import { PaymentPage } from '../payment/payment.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  data: any;
  userAmount;
  date = new Date().toISOString();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
  }

  ngOnInit() {

    
  }

  backHome(){
    this.router.navigate(['tabs'])
  }

}
