import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Post } from 'src/app/_data/post';
import { PostDTO } from '../_data/post-dto';
import { PostsProxyService } from '../_services/posts-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private proxy: PostsProxyService) { }

  gelAllPosts(): Observable<Post[]> {
    return this.proxy.getAllPost().pipe(
      map(postsDTO => {
        let posts: Post[] = [];
        postsDTO.map(postDTO => {
          posts = [...posts, this.adaptDTOToModel(postDTO)];
        });
        return posts;
      })
    );
  }

  getPostsById(postId: string): Observable<Post> {
    return this.proxy.getPostsById(postId).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.proxy.createPost(this.adaptModelTODTO(post)).pipe(
      map((postResult: PostDTO) => {
        return {
          postId: postResult._id,
          ...post
        };
      })
    );
  }

  deletePost(postId: string): Observable<Post> {
    return this.proxy.deletePost(postId).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );
  }

  modifyPost(postId: string, modifiedPost): Observable<Post>  {
    return this.proxy.modifyPost(postId, this.adaptModelTODTO(modifiedPost)).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );
  }

  private adaptDTOToModel(postDTO: PostDTO): Post {
    return {
      postId: postDTO._id,
      postAuthorName: postDTO.postAuthorName,
      postAuthorNickName: postDTO.postAuthorNickName,
      postTitle: postDTO.postTitle,
      postContent: postDTO.postContent,
      comments: postDTO.comments
    };
  }

  private adaptModelTODTO(post: Post): PostDTO {
    return {
      _id: post.postId,
      postAuthorName: post.postAuthorName,
      postAuthorNickName: post.postAuthorNickName,
      postTitle: post.postTitle,
      postContent: post.postContent,
      comments: post.comments,
      user: null
    };
  }
}
