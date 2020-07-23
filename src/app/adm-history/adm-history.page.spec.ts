import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdmHistoryPage } from './adm-history.page';

describe('AdmHistoryPage', () => {
  let component: AdmHistoryPage;
  let fixture: ComponentFixture<AdmHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
