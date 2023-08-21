import { TestBed } from '@angular/core/testing';

import { StockmngmentService } from './stockmngment.service';

describe('StockmngmentService', () => {
  let service: StockmngmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockmngmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
