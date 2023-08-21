import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtransferstockComponent } from './addtransferstock.component';

describe('AddtransferstockComponent', () => {
  let component: AddtransferstockComponent;
  let fixture: ComponentFixture<AddtransferstockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddtransferstockComponent]
    });
    fixture = TestBed.createComponent(AddtransferstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
