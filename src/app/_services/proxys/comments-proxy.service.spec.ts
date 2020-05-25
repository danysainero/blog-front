import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { CommentsProxyService } from './comments-proxy.service';
import { FAKE_POSTS } from './posts-proxy.service.spec';

describe('CommentsProxyService', () => {
  let service: CommentsProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentsProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createComment method', async(() => {
    service.createComment(FAKE_POSTS[0]._id, FAKE_COMMENTS[0])
      .subscribe((commentDTO) => expect(commentDTO[0]).toBe(FAKE_COMMENTS[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/comments/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_COMMENTS);
  }));

  it('deleteComment method', async(() => {
    service.deleteComment(FAKE_COMMENTS[0]._id)
      .subscribe((commentDTO) => expect(commentDTO[0]).toBe(FAKE_COMMENTS[0]));
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/comments/${FAKE_COMMENTS[0]._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_COMMENTS);
  }));

  it('modifyComment method', async(() => {
    const content = {commentContent: 'new content'};
    service.modifyComment(FAKE_COMMENTS[0]._id,  content)
      .subscribe((commentDTO) => {
        commentDTO[0].commentContent = content.commentContent;
        expect(commentDTO[0].commentContent).toBe('new content');
      });
    const request = httpMock.expectOne(`http://localhost:3001/api/blog/comments/${FAKE_COMMENTS[0]._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_COMMENTS);
  }));

});

export const FAKE_COMMENTS = [{
  _id: '11111111111',
  commentContent: '11111',
  user: {
    role: 1,
    _id: '1111111',
  },
  commentAuthorName: 'admin1111'
},
{
  _id: '22222222222',
  commentContent: '2222',
  user: {
    role: 0,
    _id: '222222222',
  },
  commentAuthorName: 'admin22222'
}];
