import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService, ImxTranslationProviderService } from 'qbm';

import { SpMultipleprofitcentersService } from './sp-multipleprofitcenters.service';

describe('SpMultipleprofitcentersService', () => {
  let service: SpMultipleprofitcentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        {
          provide: AppConfigService,
          useValue: {
            client: {},
            apiClient: {},
          },
        },
        { provide: ImxTranslationProviderService, useValue: {} },
      ],
    });
    service = TestBed.inject(SpMultipleprofitcentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
