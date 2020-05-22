import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Post } from '../_data/post';
import { PostDTO } from './../_data/post-dto';
import { PostsProxyService } from './posts-proxy.service';


describe('PostsProxyService', () => {
  let httpMock: HttpTestingController;
  let service: PostsProxyService;

  const fakePost: PostDTO[] =
  [{
    _id: '3453453456354345',
    postAuthorName: 'Autor',
    postAuthorNickName: 'nick',
    postTitle: 'Titulo Test unit',
    postContent: 'Text post unit',
    comments: [],
    user: {
      role: 1,
      _id: 'e56456456',
      userName: 'admin'
    }
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsProxyService],
      imports: [HttpClientTestingModule]
    });
    // We inject our service (which imports the HttpClient) and the Test Controller
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsProxyService);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('gelAllPosts method', () => {
    service.getAllPost()
      .subscribe((posts: Post[]) => expect(posts).toBe((posts)));
    const request = httpMock.expectOne('http://localhost:3001/api/blog/posts');
    expect(request.request.method).toEqual('GET');
    request.flush(fakePost);
  });

  it('getPostsById method', () => {
    service.getPostsById(fakePost[0]._id)
      .subscribe((post: Post) => expect(post).toBe(fakePost[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts/${fakePost[0]._id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(fakePost);
  });

  it('deletePost method', () => {
    service.deletePost(fakePost[0]._id)
      .subscribe((post: Post) => expect(post).toBe(fakePost[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts/${fakePost[0]._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(fakePost);
  });

  it('createPost method', () => {
    service.createPost(fakePost[0])
      .subscribe((post: Post) => expect(post).toBe(fakePost[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts`);
    expect(request.request.method).toEqual('POST');
    request.flush(fakePost);
  });

  it('modifyPost method', () => {
    service.modifyPost(fakePost[0]._id , fakePost)
      .subscribe((post: Post) => expect(post).toBe(fakePost[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts/${fakePost[0]._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(fakePost);
  });

});
