import { TestBed, inject } from '@angular/core/testing';

import { TrazaService } from './traza.service';

describe('TrazaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrazaService]
    });
  });

  it('should be created', inject([TrazaService], (service: TrazaService) => {
    expect(service).toBeTruthy();
  }));
});
