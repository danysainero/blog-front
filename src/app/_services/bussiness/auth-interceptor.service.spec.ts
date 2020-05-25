import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsProxyService } from '../proxys/posts-proxy.service';
import { FAKE_POSTS } from '../proxys/posts-proxy.service.spec';
import { AuthInterceptorService } from './auth-interceptor.service';
const apiConfig = {
  api: 'https://localhost:4200'
};

describe('AuthInterceptorService', () => {
  let httpMock: HttpTestingController;
  let service: PostsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        PostsProxyService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
    });
    service = TestBed.inject(PostsProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('shouldn´t have an Authorization header', () => {
    service.getAllPost().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.has('Authorization')).toEqual(false);
  });

  it('should have an Authorization header', () => {
    localStorage.setItem('token', '23y4i2ug5i2br3y24gru3y4g');
    service.createPost(FAKE_POSTS[0]).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.has('Authorization')).toEqual(true);
  });
});
