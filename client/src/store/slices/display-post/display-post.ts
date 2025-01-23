import { actions } from "./display-post.slice";
import { getDisplayedPost, createComment } from "./actions";

const allActions = { ...actions, getDisplayedPost, createComment };

export { allActions as actions };
export { reducer } from "./display-post.slice";
