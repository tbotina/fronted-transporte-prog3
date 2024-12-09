import { TestBed } from '@angular/core/testing';

import { DirlistaordenService } from './dirlistaorden.service';

describe('DirlistaordenService', () => {
  let service: DirlistaordenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirlistaordenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
