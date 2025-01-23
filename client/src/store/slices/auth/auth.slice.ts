import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../../libs/types";
import { logIn } from "./actions";

interface State {
  profile: Profile | null;
}

const initialState: State = {
  profile: null,
};

const { actions, reducer } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    clearProfile(state) {
      state.profile = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      logIn.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      }
    );
  },
});

export { actions, reducer };
