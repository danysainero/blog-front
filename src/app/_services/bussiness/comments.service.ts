import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Comment } from 'src/app/_data/comment';
import { DtoMapper } from '../../helpers/dto-mapper';
import { CommentDTO } from '../../_data/comment-dto';
import { CommentsProxyService } from '../proxys/comments-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

constructor(private commentsProxyService: CommentsProxyService, private dtoMapper: DtoMapper) { }

  createComment(PostId, comment): Observable<Comment> {
    return this.commentsProxyService.createComment(PostId, this.dtoMapper.adaptCommentToDTO(comment)).pipe(
      map((commentResult: CommentDTO) => ({ postId: commentResult._id, ...comment }))
    );
  }

  modifyComment(commentId: string, modifiedComment): Observable<Comment> {
    return this.commentsProxyService.modifyComment(commentId, this.dtoMapper.adaptCommentToDTO(modifiedComment)).pipe(
      map(commentDTO => this.dtoMapper.adaptDTOToComment(commentDTO))
    );
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.commentsProxyService.deleteComment(commentId).pipe(
      map(commentDTO => this.dtoMapper.adaptDTOToComment(commentDTO))
    );
  }


}
