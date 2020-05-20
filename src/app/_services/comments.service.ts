import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Comment } from 'src/app/_data/comment';
import { CommentDTO } from './../_data/comment-dto';
import { CommentsProxyService } from './comments-proxy.service';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

constructor(private commentsProxyService: CommentsProxyService) { }

  createComment(PostId, comment): Observable<Comment> {
    return this.commentsProxyService.createComment(PostId, this.adaptModelTODTO(comment)).pipe(
      map((commentResult: CommentDTO) => {
        return {
          postId: commentResult._id,
          ...comment
        };
      })
    );
  }

  modifyComment(commentId: string, modifiedComment): Observable<Comment> {
    return this.commentsProxyService.modifyComment(commentId, this.adaptModelTODTO(modifiedComment)).pipe(
      map(commentDTO => this.adaptDTOToModel(commentDTO))
    );
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.commentsProxyService.deleteComment(commentId).pipe(
      map(commentDTO => this.adaptDTOToModel(commentDTO))
    );
  }

  private adaptDTOToModel(commentDTO: CommentDTO): Comment {
    return {
      commentId: commentDTO._id,
      commentContent: commentDTO.commentContent,
      commentAuthorName: commentDTO.commentAuthorName,
      createdAt: commentDTO.createdAt,
      updatedAt: commentDTO.updatedAt,
      user: commentDTO.user,
    };
  }

  private adaptModelTODTO(comment: Comment): CommentDTO {
    return {
      _id: comment.commentId,
      commentContent: comment.commentContent,
      commentAuthorName: comment.commentAuthorName,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      user: comment.user
    };
  }
}
