import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemitPage } from './remit.page';

describe('RemitPage', () => {
  let component: RemitPage;
  let fixture: ComponentFixture<RemitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
