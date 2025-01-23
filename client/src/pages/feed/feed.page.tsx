import { useCallback, useEffect } from "react";
import { Button } from "../../libs/components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PostButton } from "./components";
import { actions as feedActions } from "../../store/slices/posts/posts";
import { useNavigate } from "react-router";
import { AppRoute } from "../../libs/enums/app-route.enum";

function FeedPage() {
  const { profile, posts, isLoading } = useAppSelector((state) => ({
    profile: state.auth.profile,
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(feedActions.getAllPosts());
  }, [dispatch]);

  const handleNewPostBtnClick = useCallback(() => {
    navigate(AppRoute.CREATE_POST);
  }, []);

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="flex items-center gap-5">
        <h1 className="text-6xl font-bold">Feed</h1>
        {profile && <Button onClick={handleNewPostBtnClick} label="new post" />}
      </div>
      {isLoading && <h1>Loading...</h1>}
      {posts &&
        posts.map((post) => {
          return (
            <PostButton
              author={post.author.username}
              title={post.title}
              postId={post.id}
              key={post.id}
            />
          );
        })}
    </div>
  );
}

export { FeedPage };
