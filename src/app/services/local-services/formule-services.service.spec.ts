import { TestBed } from '@angular/core/testing';

import { FormuleServicesService } from './formule-services.service';

describe('FormuleServicesService', () => {
  let service: FormuleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormuleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
