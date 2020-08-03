import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewreportPage } from './viewreport.page';

describe('ViewreportPage', () => {
  let component: ViewreportPage;
  let fixture: ComponentFixture<ViewreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
