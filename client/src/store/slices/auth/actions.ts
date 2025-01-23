import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../../async-thunk-config";
import { Profile } from "../../../libs/types";

interface LogInProps {
  username: string;
  password: string;
}

interface LogInApiReturn {
  profile: Profile;
  access_token: string;
}

const logIn = createAsyncThunk<Profile, LogInProps, AsyncThunkConfig>(
  "auth/log-in",
  async ({ username, password }) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data: LogInApiReturn = await response.json();
    localStorage.setItem("jwt", data.access_token);
    return data.profile;
  }
);

export { logIn };
