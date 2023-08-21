import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestoreComponent } from './createstore.component';

describe('CreatestoreComponent', () => {
  let component: CreatestoreComponent;
  let fixture: ComponentFixture<CreatestoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatestoreComponent]
    });
    fixture = TestBed.createComponent(CreatestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
