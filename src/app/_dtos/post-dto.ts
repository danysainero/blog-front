
  export  interface PostDTO {
    comments: any[];
    _id: string;
    postAuthorName: string;
    postAuthorNickName: string;
    postTitle: string;
    postContent: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface User {
    role: number;
    _id: string;
    userName: string;
    pass: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
