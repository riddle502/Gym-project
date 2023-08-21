import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductassignComponent } from './productassign.component';

describe('ProductassignComponent', () => {
  let component: ProductassignComponent;
  let fixture: ComponentFixture<ProductassignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductassignComponent]
    });
    fixture = TestBed.createComponent(ProductassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
