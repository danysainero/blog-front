import { TestBed } from '@angular/core/testing';
import { PostsProxyService } from './posts-proxy.service';


describe('PostsProxyServiceService', () => {
  let service: PostsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
