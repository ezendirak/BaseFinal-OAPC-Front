import { TestBed, inject } from '@angular/core/testing';

import { EmpressaService } from './empressa.service';

describe('EmpressaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpressaService]
    });
  });

  it('should be created', inject([EmpressaService], (service: EmpressaService) => {
    expect(service).toBeTruthy();
  }));
});
