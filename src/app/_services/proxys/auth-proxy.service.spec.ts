import { TestBed } from '@angular/core/testing';
import { AuthProxyService } from './auth-proxy.service';


describe('AuthProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthProxyService = TestBed.inject(AuthProxyService);
    expect(service).toBeTruthy();
  });
});
