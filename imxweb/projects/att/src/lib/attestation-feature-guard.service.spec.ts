/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2023 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ISessionState } from 'qbm';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AttestationFeatureGuardService } from './attestation-feature-guard.service';

describe('AttestationFeatureGuardService', () => {
  let service: AttestationFeatureGuardService;

  const attServiceStub = {
    client: {
      portal_attestation_config_get: jasmine.createSpy('portal_attestation_config_get').and.returnValue(Promise.resolve([{}])),
    },
  };
  const authService = {
    onSessionResponse: new BehaviorSubject<ISessionState>({ IsLoggedIn: true }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: attServiceStub,
        },
        {
          provide: AuthenticationService,
          useValue: authService,
        },
      ],
    });
    service = TestBed.inject(AttestationFeatureGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
