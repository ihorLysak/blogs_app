import { actions } from "./posts.slice";
import { getAllPosts, createPost } from "./actions";

const allActions = { ...actions, getAllPosts, createPost };

export { allActions as actions };
export { reducer } from "./posts.slice";
