import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-adm-history',
  templateUrl: './adm-history.page.html',
  styleUrls: ['./adm-history.page.scss'],
})
export class AdmHistoryPage implements OnInit {

  constructor(public matExpansionModule: MatExpansionModule) { }

  ngOnInit() {
  }

}
