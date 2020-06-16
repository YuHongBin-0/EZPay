import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageWalletPage } from './manage-wallet.page';

describe('ManageWalletPage', () => {
  let component: ManageWalletPage;
  let fixture: ComponentFixture<ManageWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
