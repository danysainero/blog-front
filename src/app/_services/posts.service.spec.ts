import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from './../_data/post';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  const fakePosts: Post[] =
  [{
    postId: '3453453456354345',
    postAuthorName: 'Autor',
    postAuthorNickName: 'nick',
    postTitle: 'Titulo Test unit',
    postContent: 'Text post unit',
  }];
  const fakePost: Post =
  {
    postId: '3453453456354345',
    postAuthorName: 'Autor',
    postAuthorNickName: 'nick',
    postTitle: 'Titulo Test unit',
    postContent: 'Text post unit',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostsService);
  });

  it('gelAllPosts method', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'gelAllPosts').and.callFake(() => of(fakePosts));
    service.gelAllPosts();
    expect(spyService).toHaveBeenCalled();
  });

  it('getPostsById method', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'getPostsById').and.callFake(() => of(fakePost));
    service.getPostsById(fakePost.postId);
    expect(spyService).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalledWith(fakePost.postId);

  });

  it('deletePost method', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'deletePost').and.callFake(() => of(fakePost));
    service.deletePost(fakePost.postId);
    expect(spyService).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalledWith(fakePost.postId);
  });

  it('createPost method', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'createPost').and.callFake(() => of(fakePost));
    service.createPost(fakePost);
    expect(spyService).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalledWith(fakePost);
  });

  it('modifyPost method', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'modifyPost').and.callFake(() => of(fakePost));
    service.modifyPost(fakePost.postId, fakePost.postContent);
    expect(spyService).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalledWith('3453453456354345', 'Text post unit');
  });

});

