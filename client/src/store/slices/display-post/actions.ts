import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../../async-thunk-config";
import { Post, Comment } from "../../../libs/types";

const getDisplayedPost = createAsyncThunk<
  Post,
  { id: string },
  AsyncThunkConfig
>("display-post/get-displayed-post", async ({ id }) => {
  const response = await fetch(`http://localhost:3000/post/${id}`);
  return (await response.json()) as Post;
});

interface CreateCommentProps {
  postId: string;
  content: string;
}

const createComment = createAsyncThunk<
  Comment,
  CreateCommentProps,
  AsyncThunkConfig
>("posts/create-comment", async ({ postId, content }) => {
  const response = await fetch("http://localhost:3000/comment", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      content,
    }),
  });

  return await response.json();
});

export { getDisplayedPost, createComment };
