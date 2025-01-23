import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../../libs/types";
import { getAllPosts, createPost } from "./actions";

interface State {
  posts: Post[] | null;
  isLoading: boolean;
}

const initialState: State = {
  posts: null,
  isLoading: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: "posts",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      }
    );
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        if (state.posts) {
          state.posts = [...state.posts, action.payload];
        }
      }
    );
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export { actions, reducer };
