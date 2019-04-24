import { TestBed, inject } from '@angular/core/testing';

import { ExternalApiService } from './external-api.service';

describe('ExternalApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalApiService]
    });
  });

  it('should be created', inject([ExternalApiService], (service: ExternalApiService) => {
    expect(service).toBeTruthy();
  }));
});
