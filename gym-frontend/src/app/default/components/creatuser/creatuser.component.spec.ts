import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatuserComponent } from './creatuser.component';

describe('CreatuserComponent', () => {
  let component: CreatuserComponent;
  let fixture: ComponentFixture<CreatuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatuserComponent]
    });
    fixture = TestBed.createComponent(CreatuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
