import { CommentDTO } from './comment-dto';

export interface PostDTO {
  _id: string;
  comments?: CommentDTO[];
  postAuthorName?: string;
  postAuthorNickName?: string;
  postTitle?: string;
  postContent?: string;
}



