import { type User } from "./user.type";
import { type Post } from "./post.type";

type Comment = {
  id: string;
  content: string;
  author: User;
  post: Post;
};

export { type Comment };
