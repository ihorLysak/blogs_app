import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../../async-thunk-config";
import { Post } from "../../../libs/types";

const getPost = createAsyncThunk<Post, { id: string }, AsyncThunkConfig>(
  "edit-post/get-displayed-post",
  async ({ id }) => {
    const response = await fetch(`http://localhost:3000/post/${id}`);
    return (await response.json()) as Post;
  }
);

export { getPost };
