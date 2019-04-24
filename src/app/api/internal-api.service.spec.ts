import { TestBed, inject } from '@angular/core/testing';

import { InternalApiService } from './internal-api.service';

describe('InternalApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalApiService]
    });
  });

  it('should be created', inject([InternalApiService], (service: InternalApiService) => {
    expect(service).toBeTruthy();
  }));
});
