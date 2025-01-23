import { actions } from "./auth.slice";
import { logIn } from "./actions";

const allActions = { ...actions, logIn };

export { allActions as actions };
export { reducer } from "./auth.slice";
