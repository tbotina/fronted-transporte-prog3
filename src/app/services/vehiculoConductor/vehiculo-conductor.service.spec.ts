import { TestBed } from '@angular/core/testing';

import { VehiculoConductorService } from './vehiculo-conductor.service';

describe('VehiculoConductorService', () => {
  let service: VehiculoConductorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
