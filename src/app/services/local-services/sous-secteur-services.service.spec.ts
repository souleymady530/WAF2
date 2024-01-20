import { TestBed } from '@angular/core/testing';

import { SousSecteurServicesService } from './sous-secteur-services.service';

describe('SousSecteurServicesService', () => {
  let service: SousSecteurServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousSecteurServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
