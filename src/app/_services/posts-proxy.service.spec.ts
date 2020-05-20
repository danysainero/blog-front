import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { FAKE_POSTS } from './posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';


describe('PostsProxyService', () => {
  let httpTestingController: HttpTestingController;
  let service: PostsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsProxyService],
      imports: [HttpClientTestingModule]
    });
    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsProxyService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Angular default test added when you generate a service using the CLI
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPosts method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'getAllPost').and.callFake(() => of(FAKE_POSTS));
    service.getAllPost();
    expect(spyService).toHaveBeenCalled();
  });

});
