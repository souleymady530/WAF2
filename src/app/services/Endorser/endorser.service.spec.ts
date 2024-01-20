import { TestBed } from '@angular/core/testing';

import { EndorserService } from './endorser.service';

describe('EndorserService', () => {
  let service: EndorserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndorserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
