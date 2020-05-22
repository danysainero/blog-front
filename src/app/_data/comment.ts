import { User } from './user-dto';

export interface Comment {
    commentId?: string;
    commentContent?: string;
    commentAuthorName?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
}


