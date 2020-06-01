import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Comment } from 'src/app/_data/comment';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
import { CommentsService } from './comments.service';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class CommentsStoreService extends Store<Comment[]>{

    constructor(private commentsService: CommentsService, private postsService: PostsService) {
        super();
    }

    init(id): Promise<Comment[]> {
        if (this.get()) { return; }

        return this.commentsService.getCommentsByPostsId(id).pipe(tap(comments => this.store(comments))
        ).toPromise();
    }





    deleteComment$(commentId: string): Promise<Comment> {
        return this.commentsService.deleteComment(commentId).pipe(
            tap(() => {
                const comments = this.get();
                const newComments = comments.filter(comment => comment._id !== commentId);
                this.store(newComments);
            })).toPromise();
    }

    private searchIndex(comments: Comment[], commentId: string): number {
        return comments.findIndex(item => item._id === commentId);
    }

}
