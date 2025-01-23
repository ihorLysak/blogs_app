import { type Comment } from "./comment.type";
import { Post } from "./post.type";

type User = {
  id: string;
  username: string;
  password: string;
  comments: Comment[];
  posts: Post[];
};

export { type User };
