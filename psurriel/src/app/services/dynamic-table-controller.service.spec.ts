import { TestBed } from '@angular/core/testing';

import { DynamicTableControllerService } from './dynamic-table-controller.service';

describe('DynamicTableControllerService', () => {
  let service: DynamicTableControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTableControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
