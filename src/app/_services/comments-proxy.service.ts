import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from '../_dtos/post-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsProxyService {

  constructor(private http: HttpClient) { }

  addCommentById(postId, comment): Observable<PostDTO>{
    return this.http.post<PostDTO>(`http://localhost:3001/api/blog/comments/${postId}`, comment);
  }

  modifyComment(commentId, comment): Observable<PostDTO>{
    return this.http.put<PostDTO>(`http://localhost:3001/api/blog/comments/${commentId}`, comment);
  }

  deleteComment(commentId): Observable<PostDTO> {
    return this.http.delete<PostDTO>(`http://localhost:3001/api/blog/comments/${commentId}`);
  }

}
