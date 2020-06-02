import { Injectable } from '@angular/core';
import { Comment } from '../_data/comment';
import { CommentDTO } from '../_data/comment-dto';
import { Post } from '../_data/post';
import { PostDTO } from '../_data/post-dto';
import { Token } from '../_data/token';
import { TokenDTO } from '../_data/token-dto';
import { User } from '../_data/user';
import { UserDTO } from '../_data/user-dto';


@Injectable({
    providedIn: 'root'
})
export class DtoMapper {

    constructor() { }

    adaptDTOToPost(postDTO: PostDTO): Post {
        return {
            postId: postDTO._id,
            postAuthorName: postDTO.postAuthorName,
            postAuthorNickName: postDTO.postAuthorNickName,
            postTitle: postDTO.postTitle,
            postContent: postDTO.postContent,
            comments: postDTO.comments
        };
    }

    adaptPosstToDTO(post: Post): PostDTO {
        return {
            _id: post?.postId,
            postAuthorName: post?.postAuthorName,
            postAuthorNickName: post?.postAuthorNickName,
            postTitle: post?.postTitle,
            postContent: post?.postContent,
            comments: post.comments
        };
    }

    adaptDTOToComment(commentDTO: CommentDTO): Comment {
        return {
            _id: commentDTO._id,
            commentContent: commentDTO.commentContent,
            commentAuthorName: commentDTO.commentAuthorName
        };
    }

    adaptCommentToDTO(comment: Comment): CommentDTO {
        return {
            _id: comment._id,
            commentContent: comment.commentContent,
            commentAuthorName: comment.commentAuthorName
        };
    }

    adaptDTOToToken(tokenDTO: TokenDTO): Token {
        return {
            message: tokenDTO.message,
            token: tokenDTO.token
        };
    }

    adaptDTOToUser(userDTO: UserDTO): User {
        return {
            UserRole: userDTO.role,
            UserId: userDTO._id,
            username: userDTO.userName
        };
    }

    adaptUserTODTO(user: User): UserDTO {
        return {
            role: user.UserRole,
            _id: user.UserId,
            userName: user.username
        };
    }
}
