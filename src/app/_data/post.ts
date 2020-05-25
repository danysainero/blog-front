import { User } from 'src/app/_data/user';

export interface Post {
    postId?: string;
    postAuthorName?: string;
    postAuthorNickName?: string;
    postTitle?: string;
    postContent?: string;
    comments?: any[];
    user?: User;
}
