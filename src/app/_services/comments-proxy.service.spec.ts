import { TestBed } from '@angular/core/testing';
import { CommentsProxyService } from './comments-proxy.service';


describe('CommentsProxyService', () => {
  let service: CommentsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
