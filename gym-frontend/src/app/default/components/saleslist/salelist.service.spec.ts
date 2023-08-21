import { TestBed } from '@angular/core/testing';

import { SalelistService } from './salelist.service';

describe('SalelistService', () => {
  let service: SalelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
