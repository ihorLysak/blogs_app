import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../../async-thunk-config";
import { Post } from "../../../libs/types";

const getAllPosts = createAsyncThunk<Post[], void, AsyncThunkConfig>(
  "posts/get-all-posts",
  async () => {
    const response = await fetch("http://localhost:3000/post");
    return await response.json();
  }
);

interface CreatePostProps {
  title: string;
  content: string;
}

const createPost = createAsyncThunk<Post, CreatePostProps, AsyncThunkConfig>(
  "posts/create-post",
  async ({ title, content }) => {
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    return await response.json();
  }
);

export { getAllPosts, createPost };
