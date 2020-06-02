import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Post } from 'src/app/_data/post';
import { DtoMapper } from '../../helpers/dto-mapper';
import { PostDTO } from '../../_data/post-dto';
import { PostsProxyService } from '../proxys/posts-proxy.service';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private proxy: PostsProxyService, private dtoMapper: DtoMapper) { }

  gelAllPosts(): Observable<Post[]> {
    return this.proxy.getAllPost().pipe(
      map(postsDTO => {
        let posts: Post[] = [];
        postsDTO.map(postDTO => {
          posts = [...posts, this.dtoMapper.adaptDTOToPost(postDTO)];
        });
        return posts;
      })
    );
  }

  getPostsById(postId: string): Observable<Post> {
    return this.proxy.getPostsById(postId).pipe(
      map(postDTO => this.dtoMapper.adaptDTOToPost(postDTO))
    );
  }

  createPost(post: Post): Observable<Post> {
    console.log(post);
    return this.proxy.createPost(this.dtoMapper.adaptPosstToDTO(post)).pipe(
      map((postResult: PostDTO) => this.dtoMapper.adaptDTOToPost(postResult))
    );
  }

  deletePost(postId: string): Observable<Post> {
    return this.proxy.deletePost(postId).pipe(
      map(postDTO => this.dtoMapper.adaptDTOToPost(postDTO))
    );
  }

  modifyPost(postId: string, modifiedPost): Observable<Post>  {
    return this.proxy.modifyPost(postId, this.dtoMapper.adaptPosstToDTO(modifiedPost)).pipe(
      map(postDTO => this.dtoMapper.adaptDTOToPost(postDTO))
    );
  }

}
