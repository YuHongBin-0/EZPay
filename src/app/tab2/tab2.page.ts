import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  slideOpts = { loop: true };

  constructor() {}

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

}
