import { type Comment } from "./comment.type";
import { type User } from "./user.type";

type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
};

export { type Post };
