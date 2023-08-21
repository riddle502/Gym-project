import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomorsreturnComponent } from './customorsreturn.component';

describe('CustomorsreturnComponent', () => {
  let component: CustomorsreturnComponent;
  let fixture: ComponentFixture<CustomorsreturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomorsreturnComponent]
    });
    fixture = TestBed.createComponent(CustomorsreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
