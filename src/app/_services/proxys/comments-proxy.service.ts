import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from '../../_data/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsProxyService {

  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3001/api/blog/comments';
  }

  createComment(postId, comment): Observable<CommentDTO> {
    return this.httpClient.post<CommentDTO>(`${this.url}/${postId}`, comment);
  }

  modifyComment(commentId, comment): Observable<CommentDTO> {
    return this.httpClient.put<CommentDTO>(`${this.url}/${commentId}`, comment);
  }

  deleteComment(commentId): Observable<CommentDTO> {
    return this.httpClient.delete<CommentDTO>(`${this.url}/${commentId}`);
  }

}
