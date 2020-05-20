export interface CommentDTO {
    _id: string;
    commentContent: string;
    commentAuthorName: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}


interface User {
    role: number;
    _id: string;
    userName: string;
}
