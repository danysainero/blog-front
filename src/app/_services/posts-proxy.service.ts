import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from '../_data/post-dto';
@Injectable({
  providedIn: 'root'
})
export class PostsProxyService {

  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3001/api/blog/posts';
  }

  getAllPost(): Observable<PostDTO[]> {
    return this.httpClient.get<PostDTO[]>(this.url);
  }

  getPostsById(postId: string): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(`${this.url}/${postId}`);
  }

  createPost(post): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>(this.url, post);
  }

  modifyPost(postId: string, postToModify): Observable<PostDTO> {
    postToModify._id = postId;
    return this.httpClient.put<PostDTO>(`${this.url}/${postId}`, postToModify);
  }

  deletePost(postId: string): Observable<PostDTO> {
    return this.httpClient.delete<PostDTO>(`${this.url}/${postId}`);
  }
}
