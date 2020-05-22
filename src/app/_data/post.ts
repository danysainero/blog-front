import { User } from './user-dto';

export interface Post {
    postId?: string;
    postAuthorName?: string;
    postAuthorNickName?: string;
    postTitle?: string;
    postContent?: string;
    comments?: any[];
    user?: User;
}
