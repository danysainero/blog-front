import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from './../_data/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsProxyService {

  constructor(private http: HttpClient) { }

  createComment(postId, comment): Observable<CommentDTO>{
    return this.http.post<CommentDTO>(`http://localhost:3001/api/blog/comments/${postId}`, comment);
  }

  modifyComment(commentId, comment): Observable<CommentDTO>{
    return this.http.put<CommentDTO>(`http://localhost:3001/api/blog/comments/${commentId}`, comment);
  }

  deleteComment(commentId): Observable<CommentDTO> {
    return this.http.delete<CommentDTO>(`http://localhost:3001/api/blog/comments/${commentId}`);
  }

}
