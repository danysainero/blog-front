import { TestBed } from '@angular/core/testing';

import { GuardsServiceService } from './guards-service.service';

describe('GuardsServiceService', () => {
  let service: GuardsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
