import { TestBed } from '@angular/core/testing';

import { MedicamenteService } from './medicamente.service';

describe('MedicamenteService', () => {
  let service: MedicamenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
