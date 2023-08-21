import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategriesComponent } from './productcategries.component';

describe('ProductcategriesComponent', () => {
  let component: ProductcategriesComponent;
  let fixture: ComponentFixture<ProductcategriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductcategriesComponent]
    });
    fixture = TestBed.createComponent(ProductcategriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
