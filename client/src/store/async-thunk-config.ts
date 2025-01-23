import { type store } from "./store";

type AsyncThunkConfig = {
  dispatch: typeof store.dispatch;
  state: ReturnType<typeof store.getState>;
};

export { type AsyncThunkConfig };
