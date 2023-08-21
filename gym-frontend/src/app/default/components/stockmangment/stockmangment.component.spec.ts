import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmangmentComponent } from './stockmangment.component';

describe('StockmangmentComponent', () => {
  let component: StockmangmentComponent;
  let fixture: ComponentFixture<StockmangmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockmangmentComponent]
    });
    fixture = TestBed.createComponent(StockmangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
