import { TestBed } from '@angular/core/testing';

import { Formule2ServiceService } from './formule2-service.service';

describe('Formule2ServiceService', () => {
  let service: Formule2ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Formule2ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
