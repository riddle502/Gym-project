import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferreportComponent } from './transferreport.component';

describe('TransferreportComponent', () => {
  let component: TransferreportComponent;
  let fixture: ComponentFixture<TransferreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferreportComponent]
    });
    fixture = TestBed.createComponent(TransferreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
