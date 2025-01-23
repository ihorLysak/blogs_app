import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as displayPostActions } from "../../store/slices/display-post/display-post";

import { CommentCard, CreateCommentForm, EditButtons } from "./components";

function PostPage() {
  const { postId } = useParams() as { postId: string };
  const { profile, post, isLoading } = useAppSelector((state) => ({
    profile: state.auth.profile,
    post: state.displayPost.post,
    isLoading: state.displayPost.isLoading,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(displayPostActions.getDisplayedPost({ id: postId }));
  }, [dispatch, postId]);

  return (
    <div className="flex flex-col p-5 gap-5">
      {isLoading && <h1>Loading...</h1>}
      {post && (
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="flex items-center justify-between text-6xl font-bold">
              <div>
                {post?.title}{" "}
                <span className="text-xl">by {post?.author.username}</span>
              </div>
              <div>
                {profile?.id === post.author.id && (
                  <EditButtons postId={postId} />
                )}
              </div>
            </h1>
            <div className="flex flex-col p-5 shadow-xl bg-white gap-4 min-w-96">
              {post?.content}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Comments</h2>
            {profile && <CreateCommentForm postId={postId} />}
            <div className="flex flex-col w-full gap-5">
              {post &&
                post.comments.map((comment) => {
                  return <CommentCard commentData={comment} key={comment.id} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { PostPage };
