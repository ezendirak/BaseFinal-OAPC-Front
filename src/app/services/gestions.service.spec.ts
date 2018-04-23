import { TestBed, inject } from '@angular/core/testing';

import { GestionsService } from './gestions.service';

describe('GestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionsService]
    });
  });

  it('should be created', inject([GestionsService], (service: GestionsService) => {
    expect(service).toBeTruthy();
  }));
});
