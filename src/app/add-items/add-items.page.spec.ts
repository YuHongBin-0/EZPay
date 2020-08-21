import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddItemsPage } from './add-items.page';

describe('AddItemsPage', () => {
  let component: AddItemsPage;
  let fixture: ComponentFixture<AddItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
