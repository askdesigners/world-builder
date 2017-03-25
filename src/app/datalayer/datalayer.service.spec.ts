/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatalayerService } from './datalayer.service';

describe('DatalayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatalayerService]
    });
  });

  it('should ...', inject([DatalayerService], (service: DatalayerService) => {
    expect(service).toBeTruthy();
  }));
});
