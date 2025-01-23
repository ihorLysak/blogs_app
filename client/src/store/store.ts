import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./slices/auth/auth.slice";
import { reducer as postsReducer } from "./slices/posts/posts.slice";
import { reducer as displayPostReducer } from "./slices/display-post/display-post.slice";
import { reducer as editPostReducer } from "./slices/edit-post/edit-post.slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    displayPost: displayPostReducer,
    editPost: editPostReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
