import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorReqPage } from './vendor-req.page';

describe('VendorReqPage', () => {
  let component: VendorReqPage;
  let fixture: ComponentFixture<VendorReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorReqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
