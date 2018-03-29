import { TestBed, inject } from '@angular/core/testing';

import { ApiUrlConfigService } from './api-url-config.service';

describe('ApiUrlConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlConfigService]
    });
  });

  it('should be created', inject([ApiUrlConfigService], (service: ApiUrlConfigService) => {
    expect(service).toBeTruthy();
  }));
});
