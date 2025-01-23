import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Comment } from "../../../libs/types";
import { getDisplayedPost, createComment } from "./actions";

interface State {
  post: Post | null;
  isLoading: boolean;
}

const initialState: State = {
  post: null,
  isLoading: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: "display-post",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.isLoading = false;
        const newComment = action.payload;

        if (state.post) {
          state.post.comments = [newComment, ...state.post.comments];
        }
      }
    );
    builder.addCase(createComment.rejected, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDisplayedPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getDisplayedPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.post = action.payload;
      }
    );
    builder.addCase(getDisplayedPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export { actions, reducer };
