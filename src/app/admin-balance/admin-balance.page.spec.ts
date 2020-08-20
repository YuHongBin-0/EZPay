import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminBalancePage } from './admin-balance.page';

describe('AdminBalancePage', () => {
  let component: AdminBalancePage;
  let fixture: ComponentFixture<AdminBalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
