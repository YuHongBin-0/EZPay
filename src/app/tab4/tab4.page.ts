import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

   //Data
   chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
   chartLabels: Label[];
 
   // Options
   chartOptions = {
     responsive: true,
     title: {
       display: true,
       text: 'Historic Sales Amount'
     },
     pan: {
       enabled: true,
       mode: 'xy'
     },
     zoom: {
       enabled: true,
       mode: 'xy'
     }
   };
   chartColors: Color[] = [
     {
       borderColor: '#000000',
       backgroundColor: '#ff00ff'
     }
   ];
   chartType = 'line';
   showLegend = false;
  
   // For search
   stock = '';

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
  }
  getData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?from=2018-03-12&to=2019-03-12&apikey=a8f7b1816037080e47ac5a74abd999ac`)
    .subscribe(res => {

    res.toString;
      
    const history = res['historical'];

    this.chartLabels = [];
    this.chartData[0].data = [];
    

    for (let entry of history) {
      this.chartLabels.push(entry.date);
      this.chartData[0].data.push(entry['close']);
    }
  });
}

typeChanged(e) {
  const on = e.detail.checked;
  this.chartType = on ? 'line' : 'bar';
}

addFoodItems() {
  this.router.navigate(['/add-items']);
}


}
