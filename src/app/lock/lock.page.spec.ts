import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LockPage } from './lock.page';

describe('LockPage', () => {
  let component: LockPage;
  let fixture: ComponentFixture<LockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
