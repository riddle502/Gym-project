import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitreportComponent } from './profitreport.component';

describe('ProfitreportComponent', () => {
  let component: ProfitreportComponent;
  let fixture: ComponentFixture<ProfitreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitreportComponent]
    });
    fixture = TestBed.createComponent(ProfitreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
