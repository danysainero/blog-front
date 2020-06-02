import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Comment } from 'src/app/_data/comment';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
import { CommentsService } from './comments.service';
import { NotificacionesBusService } from './notificaciones-bus.service';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class PostStore extends Store<Post>{

    constructor(
        private commentsService: CommentsService,
        private postsService: PostsService,
        private notificacionesBusService: NotificacionesBusService) {
        super();
    }

    init(id): Promise<Post> {
        return this.commentsService.getCommentsByPostsId(id).pipe(tap(post => this.store(post))
        ).toPromise();
    }

    addComment$(postId, comment) {
        return this.commentsService.createComment(postId, comment).pipe(
            tap((resComment) => {
                const post = this.get();
                const comAssign = Object.assign({}, resComment);
                const newComments = [...post.comments, comAssign];
                const newPost = { ...post, comments: newComments };
                this.store(newPost);
            })
        ).toPromise().then().catch(err => {
            this.notificacionesBusService.showError(err.error.message);
        });
    }

    modifyComment$(commentId, comment) {

        return this.commentsService.modifyComment(commentId, comment).pipe(
            tap(() => {
                const post = this.get();
                const p = Object.assign({}, comment);
                const index = this.searchIndex(post.comments, commentId);
                const newComments = [...post.comments.slice(0, index), p, ...post.comments.slice(index + 1)];
                post.comments = newComments;
                this.store(post);
            }))
            .toPromise().then().catch(error => this.notificacionesBusService.showError(error.error.message));
    }

    deleteComment$(commentId: string) {
        return this.commentsService.deleteComment(commentId).pipe(
            tap(() => {
                const post = this.get();
                const newComments = post.comments.filter(comment => comment._id !== commentId);
                post.comments = newComments;
                this.store(post);
            })).toPromise();
    }

    private searchIndex(comments: Comment[], commentId: string): number {
        return comments.findIndex(item => item._id === commentId);
    }

}
