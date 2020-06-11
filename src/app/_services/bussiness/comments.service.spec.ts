import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Comment } from '../../_data/comment';
import { CommentsProxyService } from '../proxys/comments-proxy.service';
import { FAKE_COMMENTS } from '../proxys/comments-proxy.service.spec';
import { FAKE_POSTS } from '../proxys/posts-proxy.service.spec';
import { CommentsService } from './comments.service';


describe('CommentsService', () => {
  let service: CommentsService;
  let proxy: CommentsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentsService);
    proxy = TestBed.inject(CommentsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('createComment method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'createComment').and.returnValue(of(FAKE_COMMENTS[0]));
    service.createComment(FAKE_POSTS[0]._id, FAKE_COMMENTS[0]).subscribe(
      (comment: Comment) => {
        expect(comment.commentContent).toEqual(FAKE_COMMENTS[0].commentContent);
        expect(comment.commentAuthorName).toEqual(FAKE_COMMENTS[0].commentAuthorName);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));


  it('modifyComment method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'modifyComment').and.returnValue(of(FAKE_COMMENTS[1]));
    service.modifyComment(FAKE_COMMENTS[0]._id, FAKE_COMMENTS[1]).subscribe(
      (comment: Comment) => {
        expect(comment.commentContent).toEqual(FAKE_COMMENTS[1].commentContent);
        expect(comment.commentAuthorName).toEqual(FAKE_COMMENTS[1].commentAuthorName);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  it('deleteComment method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'deleteComment').and.returnValue(of(FAKE_COMMENTS[0]));
    service.deleteComment(FAKE_COMMENTS[0]._id).subscribe(
      (comment: Comment) => {
        expect(comment._id).toEqual(FAKE_COMMENTS[0]._id);
        expect(comment.commentContent).toEqual(FAKE_COMMENTS[0].commentContent);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
});
