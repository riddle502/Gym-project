import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbystoreComponent } from './orderbystore.component';

describe('OrderbystoreComponent', () => {
  let component: OrderbystoreComponent;
  let fixture: ComponentFixture<OrderbystoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderbystoreComponent]
    });
    fixture = TestBed.createComponent(OrderbystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
