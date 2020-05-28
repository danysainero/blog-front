import { Comment } from './comment';

export interface Post {
    postId?: string;
    postAuthorName?: string;
    postAuthorNickName?: string;
    postTitle?: string;
    postContent?: string;
    comments?: Comment[];
}

