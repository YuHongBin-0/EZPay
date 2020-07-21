import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  page2Selected(){
    console.log('i am here');
  }

}
