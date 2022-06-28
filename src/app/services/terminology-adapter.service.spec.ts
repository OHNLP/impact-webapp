import { TestBed } from '@angular/core/testing';

import { TerminologyAdapterService } from './terminology-adapter.service';

describe('TerminologyAdapterService', () => {
  let service: TerminologyAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminologyAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
