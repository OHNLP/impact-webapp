import { TestBed } from '@angular/core/testing';

import { MiddlewareAdapterService } from './middleware-adapter.service';

describe('MiddlewareAdapterService', () => {
  let service: MiddlewareAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiddlewareAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
