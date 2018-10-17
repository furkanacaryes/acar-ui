import { TestBed, inject } from '@angular/core/testing';

import { AcarUiService } from './acar-ui.service';

describe('AcarUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcarUiService]
    });
  });

  it('should be created', inject([AcarUiService], (service: AcarUiService) => {
    expect(service).toBeTruthy();
  }));
});
