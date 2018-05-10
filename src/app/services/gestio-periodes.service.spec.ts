import { TestBed, inject } from '@angular/core/testing';

import { GestioPeriodesService } from './gestio-periodes.service';

describe('GestioPeriodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestioPeriodesService]
    });
  });

  it('should be created', inject([GestioPeriodesService], (service: GestioPeriodesService) => {
    expect(service).toBeTruthy();
  }));
});
