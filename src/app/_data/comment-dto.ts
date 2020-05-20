import { User } from './user-dto';

export interface CommentDTO {
    _id: string;
    commentContent: string;
    commentAuthorName: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}
