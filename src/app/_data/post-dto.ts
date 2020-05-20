
  export  interface PostDTO {
    _id: string;
    comments: any[];
    postAuthorName: string;
    postAuthorNickName: string;
    postTitle: string;
    postContent: string;
    user: User;
  }

  interface User {
    role: number;
    _id: string;
    userName: string;
    pass: string;
  }
