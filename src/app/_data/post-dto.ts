import { UserDTO } from 'src/app/_data/user-dto';

export interface PostDTO {
  _id: string;
  comments: any[];
  postAuthorName: string;
  postAuthorNickName: string;
  postTitle: string;
  postContent: string;
  user: UserDTO;
}
