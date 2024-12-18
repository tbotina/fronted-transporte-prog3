import { TestBed } from '@angular/core/testing';

import { AtempService } from './atemp.service';

describe('AtempService', () => {
  let service: AtempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
