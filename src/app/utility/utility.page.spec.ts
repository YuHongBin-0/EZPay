import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilityPage } from './utility.page';

describe('UtilityPage', () => {
  let component: UtilityPage;
  let fixture: ComponentFixture<UtilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
