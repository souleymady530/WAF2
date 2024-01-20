import { TestBed } from '@angular/core/testing';

import { SecteurServicesService } from './secteur-services.service';

describe('SecteurServicesService', () => {
  let service: SecteurServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecteurServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
