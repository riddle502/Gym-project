import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmorsComponent } from './custmors.component';

describe('CustmorsComponent', () => {
  let component: CustmorsComponent;
  let fixture: ComponentFixture<CustmorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustmorsComponent]
    });
    fixture = TestBed.createComponent(CustmorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
