import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaxPage } from './tax.page';

describe('TaxPage', () => {
  let component: TaxPage;
  let fixture: ComponentFixture<TaxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
