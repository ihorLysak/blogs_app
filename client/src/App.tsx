import { Routes, Route } from "react-router";
import { AppRoute } from "./libs/enums/app-route.enum";
import {
  FeedPage,
  LogInPage,
  SignUpPage,
  CreatePostPage,
  PostPage,
  EditPostPage,
} from "./pages";
import { HeaderWrapper } from "./pages/libs/components";

function App() {
  return (
    <>
      <Routes>
        <Route path={AppRoute.LOG_IN} element={<LogInPage />} />
        <Route path={AppRoute.SIGN_UP} element={<SignUpPage />} />
        <Route element={<HeaderWrapper />}>
          <Route path={AppRoute.FEED} element={<FeedPage />} />
          <Route path={AppRoute.CREATE_POST} element={<CreatePostPage />} />
          <Route path={`${AppRoute.POST}/:postId`} element={<PostPage />} />
          <Route
            path={`${AppRoute.EDIT_POST}/:postId`}
            element={<EditPostPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
