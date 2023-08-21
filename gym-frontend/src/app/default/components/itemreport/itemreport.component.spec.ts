import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemreportComponent } from './itemreport.component';

describe('ItemreportComponent', () => {
  let component: ItemreportComponent;
  let fixture: ComponentFixture<ItemreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemreportComponent]
    });
    fixture = TestBed.createComponent(ItemreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
