import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayvenPage } from './payven.page';

describe('PayvenPage', () => {
  let component: PayvenPage;
  let fixture: ComponentFixture<PayvenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayvenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayvenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
