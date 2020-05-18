import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from '../_dtos/post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostsProxyService {
  response: any;

  constructor(private http: HttpClient) { }

  getAllPost(): Observable<PostDTO> {
    return this.http.get<PostDTO>('http://localhost:3001/api/blog/posts');
  }

  getPostsById(id): Observable<PostDTO> {
    return this.http.get<PostDTO>(`http://localhost:3001/api/blog/posts/${id}`);
  }

  createPost(post): Observable<PostDTO> {
  return this.http.post<PostDTO>(`http://localhost:3001/api/blog/posts`, post);


  }
  modifyPost(id, modifiedPost): Observable<PostDTO>  {

    return this.http.put<PostDTO>(`http://localhost:3001/api/blog/posts/${id}`, modifiedPost);
  }

  deletePost(id): Observable<PostDTO> {
    return this.http.delete<PostDTO>(`http://localhost:3001/api/blog/posts/${id}`);
  }


}
