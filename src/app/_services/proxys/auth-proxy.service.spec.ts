import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthProxyService } from 'src/app/_services/proxys/auth-proxy.service';


describe('AuthProxyService', () => {
  let proxy: AuthProxyService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    proxy = TestBed.inject(AuthProxyService);
  });

  it('should auth proxy service be created', () => {
    expect(proxy).toBeTruthy();
  });
});
