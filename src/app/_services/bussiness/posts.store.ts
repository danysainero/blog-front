import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/_data/post';
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
            tap((resPost) => {
                const posts = this.get();
                const p = Object.assign({}, resPost);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
            })
        ).toPromise();
    }

    private searchIndex(posts: Post[], postId: string): number {
        return posts.findIndex(item => item.postId === postId);
    }
}
