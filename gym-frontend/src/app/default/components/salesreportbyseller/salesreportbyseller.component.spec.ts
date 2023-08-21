import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreportbysellerComponent } from './salesreportbyseller.component';

describe('SalesreportbysellerComponent', () => {
  let component: SalesreportbysellerComponent;
  let fixture: ComponentFixture<SalesreportbysellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesreportbysellerComponent]
    });
    fixture = TestBed.createComponent(SalesreportbysellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
