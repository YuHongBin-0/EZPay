import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaylockPage } from './paylock.page';

describe('PaylockPage', () => {
  let component: PaylockPage;
  let fixture: ComponentFixture<PaylockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaylockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
