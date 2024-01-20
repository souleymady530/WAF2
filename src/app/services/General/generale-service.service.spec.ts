import { TestBed } from '@angular/core/testing';

import { GeneraleServiceService } from './generale-service.service';

describe('GeneraleServiceService', () => {
  let service: GeneraleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneraleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
