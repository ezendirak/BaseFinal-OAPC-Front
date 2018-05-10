import { TestBed, inject } from '@angular/core/testing';

import { GestioRegisterService } from './gestio-register.service';

describe('GestioRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestioRegisterService]
    });
  });

  it('should be created', inject([GestioRegisterService], (service: GestioRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
