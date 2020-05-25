import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { PostsProxyService } from './posts-proxy.service';

describe('PostsProxyService', () => {
  let service: PostsProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsProxyService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gelAllPosts method', () => {
    service.getAllPost()
      .subscribe((postDTO) => expect(postDTO).toBe((FAKE_POSTS)));
    const request = httpMock.expectOne('http://localhost:3001/api/blog/posts');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
  });

  it('getPostsById method', async(() => {
    service.getPostsById(FAKE_POSTS[0]._id)
      .subscribe((postDTO) => expect(postDTO[0]).toBe(FAKE_POSTS[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
  }));

  it('createPost method', async(() => {
    service.createPost(FAKE_POSTS[0])
      .subscribe((postDTO) => expect(postDTO[0]).toBe(FAKE_POSTS[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts`);
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_POSTS);
  }));

  it('modifyPost method', async(() => {
    const newTitle = { postTitle: 'new title' };

    service.modifyPost(FAKE_POSTS[0]._id, newTitle)
      .subscribe((postDTO) => {
        postDTO[0].postTitle = newTitle.postTitle;
        expect(postDTO[0].postTitle).toBe(newTitle.postTitle);
      });
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_POSTS);
  }));

  it('deletePost method', async(() => {
    service.deletePost(FAKE_POSTS[0]._id)
      .subscribe((postDTO) => expect(postDTO[0]).toBe(FAKE_POSTS[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_POSTS);
  }));

});

export const FAKE_POSTS =
  [{
    _id: '3453453456354345',
    postAuthorName: 'Autor',
    postAuthorNickName: 'nick',
    postTitle: 'Titulo Test unit',
    postContent: 'Text post unit',
    comments: [{
      _id: '5ec515ff4cca4f468bf3c544',
      commentContent: 'holaaaa',
      user: '5eb7bd383745fc5143e5c1ad',
      commentAuthorName: 'admin2'
    }],
    user: {
      role: 1,
      _id: 'e56456456',
      userName: 'admin'
    }
  },
  {
    _id: '2232323233',
    postAuthorName: 'Autor2',
    postAuthorNickName: 'nick2',
    postTitle: 'Titulo Test unit2',
    postContent: 'Text post unit2',
    comments: [{
      _id: '5ec6a81f4cca4f468bf3c552',
      commentContent: 'comment 2w4234',
      user: '5eb7bd383745fc5143e5c1ad',
      commentAuthorName: 'admin2'
    }],
    user: {
      role: 1,
      _id: '2222222',
      userName: 'admin2'
    }
  }];
