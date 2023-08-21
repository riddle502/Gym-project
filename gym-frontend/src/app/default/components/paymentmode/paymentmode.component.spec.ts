import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmodeComponent } from './paymentmode.component';

describe('PaymentmodeComponent', () => {
  let component: PaymentmodeComponent;
  let fixture: ComponentFixture<PaymentmodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentmodeComponent]
    });
    fixture = TestBed.createComponent(PaymentmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
