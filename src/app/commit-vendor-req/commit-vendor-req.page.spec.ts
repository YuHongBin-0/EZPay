import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommitVendorReqPage } from './commit-vendor-req.page';

describe('CommitVendorReqPage', () => {
  let component: CommitVendorReqPage;
  let fixture: ComponentFixture<CommitVendorReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitVendorReqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitVendorReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
