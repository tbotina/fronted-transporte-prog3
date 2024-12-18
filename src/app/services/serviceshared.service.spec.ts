import { TestBed } from '@angular/core/testing';

import { ServicesharedService } from './serviceshared.service';

describe('ServicesharedService', () => {
  let service: ServicesharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
