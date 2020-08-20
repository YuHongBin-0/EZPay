import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageVendorPage } from './manage-vendor.page';

describe('ManageVendorPage', () => {
  let component: ManageVendorPage;
  let fixture: ComponentFixture<ManageVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVendorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
