import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/_data/post';
import { PostsService } from './posts.service';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class PostsStoreService extends Store<Post[]>{

    constructor(private service: PostsService) {
        super();
    }

    init(): Promise<Post[]> {
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
        const newPosts = posts.filter(post => post.postId !== postId); this.store(newPosts);
        }) ).toPromise();
        }
}
