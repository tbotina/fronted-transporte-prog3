import { TestBed } from '@angular/core/testing';

import { VehiculoDuenoService } from './vehiculo-dueno.service';

describe('VehiculoDuenoService', () => {
  let service: VehiculoDuenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoDuenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
