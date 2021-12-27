import { TestBed } from '@angular/core/testing';

import { CiPmeService } from './ci-pme.service';

describe('CiPmeService', () => {
  let service: CiPmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiPmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
