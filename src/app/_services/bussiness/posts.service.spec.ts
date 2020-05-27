import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Post } from 'src/app/_data/post';
import { PostsProxyService } from '../proxys/posts-proxy.service';
import { FAKE_POSTS } from '../proxys/posts-proxy.service.spec';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let proxy: PostsProxyService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostsService);
    proxy = TestBed.inject(PostsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gelAllPosts method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'getAllPost').and.callFake(() => of(FAKE_POSTS));
    service.gelAllPosts().subscribe(
      (posts: Post[]) => {
        expect(posts[0].postId).toEqual(FAKE_POSTS[0]._id);
        expect(posts[0].postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
        expect(posts[0].comments).toEqual(FAKE_POSTS[0].comments);
        expect(posts[0].postAuthorNickName).toEqual(FAKE_POSTS[0].postAuthorNickName);
        expect(posts[0].postContent).toEqual(FAKE_POSTS[0].postContent);
        expect(posts[0].postTitle).toEqual(FAKE_POSTS[0].postTitle);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  it('getPostsById method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'getPostsById').and.returnValue(of(FAKE_POSTS[0]));
    service.getPostsById(FAKE_POSTS[0]._id).subscribe(
      (post: Post) => {
        expect(post.postId).toEqual(FAKE_POSTS[0]._id);
        expect(post.postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
        expect(post.postAuthorNickName).toEqual(FAKE_POSTS[0].postAuthorNickName);
        expect(post.postContent).toEqual(FAKE_POSTS[0].postContent);
        expect(post.postTitle).toEqual(FAKE_POSTS[0].postTitle);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
    expect(spyProxy).toHaveBeenCalledWith(FAKE_POSTS[0]._id);

  }));

  it('createPost method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'createPost').and.returnValue(of(FAKE_POSTS[0]));
    service.createPost(FAKE_POST[0]).subscribe(
      (post: Post) => {
        expect(post.postId).toEqual(FAKE_POST[0]._id);
        expect(post.postAuthorName).toEqual(FAKE_POST[0].postAuthorName);
        expect(post.comments).toEqual(FAKE_POST[0].comments);
        expect(post.postAuthorNickName).toEqual(FAKE_POST[0].postAuthorNickName);
        expect(post.postContent).toEqual(FAKE_POST[0].postContent);
        expect(post.postTitle).toEqual(FAKE_POST[0].postTitle);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  it('modifyPost method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'modifyPost').and.returnValue(of(FAKE_POSTS[0]));
    service.modifyPost(FAKE_POSTS[0]._id, FAKE_POSTS[1].postTitle).subscribe(
      (post: Post) => {
        expect(post.postTitle).toEqual('new title');
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  it('deletePost method should mapper dto to model', async(() => {
    const spyProxy = spyOn(proxy, 'deletePost').and.returnValue(of(FAKE_POSTS[0]));
    service.deletePost(FAKE_POSTS[0]._id).subscribe(
      (post: Post) => {
        expect(post.postId).toEqual(FAKE_POSTS[0]._id);
        expect(post.postAuthorName).toEqual(FAKE_POSTS[0].postAuthorName);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
        expect(post.postAuthorNickName).toEqual(FAKE_POSTS[0].postAuthorNickName);
        expect(post.postContent).toEqual(FAKE_POSTS[0].postContent);
        expect(post.postTitle).toEqual(FAKE_POSTS[0].postTitle);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
    expect(spyProxy).toHaveBeenCalledWith(FAKE_POSTS[0]._id);

  }));


});


export const FAKE_POST =
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
    }]
  }];
