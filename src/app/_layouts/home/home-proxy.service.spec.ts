import { TestBed } from '@angular/core/testing';

import { HomeProxyService } from './home-proxy.service';

describe('HomeProxyService', () => {
  let service: HomeProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
