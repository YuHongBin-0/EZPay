import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyqrPage } from './myqr.page';

describe('MyqrPage', () => {
  let component: MyqrPage;
  let fixture: ComponentFixture<MyqrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyqrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
