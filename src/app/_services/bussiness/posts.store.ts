import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/_data/post';
import { Comment } from './../../_data/comment';
import { CommentsService } from './comments.service';
import { PostsService } from './posts.service';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class PostsStoreService extends Store<Post[]>{

    constructor(private service: PostsService, private commentsService: CommentsService) {
        super();
    }

    init(): Promise<Post[]> {
        if (this.get()) { return; }

        return this.service.gelAllPosts().pipe(tap(posts => this.store(posts))
        ).toPromise();
    }

    getPostById$(postId: string): Promise<Post> {
        return this.service.getPostsById(postId).pipe(
            tap(postDetail => {
                const posts = this.get();
                const p = Object.assign({}, postDetail);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
            })).toPromise();
    }

    createPost$(post: Post): Promise<Post> {

        return this.service.createPost(post).pipe(
            tap(postResult => {
                this.store([...this.get(), postResult]);
            })).toPromise();
    }

    deletePost$(postId: string): Promise<Post> {
        return this.service.deletePost(postId).pipe(
            tap(() => {
                const posts = this.get();
                const newPosts = posts.filter(post => post.postId !== postId);
                this.store(newPosts);
            })).toPromise();
    }


    modifyPost$(postId: string, post: Post): Promise<Post> {
        return this.service.modifyPost(postId, post).pipe(
            tap(() => {
                const posts = this.get();
                const p = Object.assign({}, post);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
            })
        ).toPromise();
    }

/**** COMMENTS  *************************************************************************************************/

    addComment$(postId: string, comment: Comment) {
        return this.commentsService.createComment(postId, comment).pipe(
            tap((resComment) => {
                const posts = this.get();
                const comAssign = Object.assign({}, resComment);
                const postIndex = this.searchIndex(posts, postId);
                posts[postIndex].comments.push(comAssign);
                this.store(posts);
            })
        ).toPromise();
    }

   /*  addComment$(postId: string, comment: Comment){
        return this.commentsService.createComment(postId, comment).pipe(
            tap(newC => {
                const posts = this.get();
                const c = Object.assign({}, newC);
                const index = this.searchIndex(posts, postId);
                const newComments = [...posts[index].comments, c];
                const foo = { ...posts[index], ...newComments };
                const newPosts = [...posts.slice(0, index), foo, ...posts.slice(index + 1)];
                this.store([...posts, ...newPosts]);
            })).toPromise();
    } */

    /* modifyComment$(commentId: string, comment: Comment): Promise<Comment> {
        return this.commentsService.modifyComment(commentId, comment).pipe(
            tap(() => {
                const comments = this.get();
                const p = Object.assign({}, comment);
                const index = this.searchIndex(comments, commentId);
                const newPosts = [...comments.slice(0, index), p, ...comments.slice(index + 1)];
                this.store(newPosts);
            })
        ).toPromise();
    } */

    deleteComment$(postId: string , commentId: string) {
        return this.commentsService.deleteComment(commentId).pipe(
            tap(() => {
                const posts = this.get();
                const index = this.searchIndex(posts, postId);
                const newComments = posts[index].comments.filter(comment => comment._id !== commentId);
                const posts2 = this.get();
                this.store(posts2);
            })).toPromise();
    }


    private searchIndex(posts: Post[], postId: string): number {
        return posts.findIndex(item => item.postId === postId);
    }

    private searchCommentIndex(comments: Comment[], commentId: string): number {
        return comments.findIndex(item => item._id === commentId);
    }
}
