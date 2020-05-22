import { User } from './user-dto';
export interface PostDTO {
  _id: string;
  comments: any[];
  postAuthorName: string;
  postAuthorNickName: string;
  postTitle: string;
  postContent: string;
  user: User;
}
