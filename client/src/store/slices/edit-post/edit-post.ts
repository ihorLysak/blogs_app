import { actions } from "./edit-post.slice";
import { getPost } from "./actions";

const allActions = { ...actions, getPost };

export { allActions as actions };
export { reducer } from "./edit-post.slice";
