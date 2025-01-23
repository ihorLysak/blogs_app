import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPost } from "./actions";
import { Post } from "../../../libs/types";
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
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.isLoading = false;
      state.post = action.payload;
    });
  },
});

export { actions, reducer };
