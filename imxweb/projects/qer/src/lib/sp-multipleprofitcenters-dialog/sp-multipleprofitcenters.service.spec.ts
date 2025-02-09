import { TestBed } from '@angular/core/testing';

import { SpMultipleprofitcentersService } from './sp-multipleprofitcenters.service';

describe('SpMultipleprofitcentersService', () => {
  let service: SpMultipleprofitcentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpMultipleprofitcentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
