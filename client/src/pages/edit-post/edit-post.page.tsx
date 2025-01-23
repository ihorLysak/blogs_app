import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AppRoute } from "../../libs/enums/app-route.enum";
import { Button } from "../../libs/components";
import { useForm } from "react-hook-form";
import { actions as editPostActions } from "../../store/slices/edit-post/edit-post";
import { actions as displayPostActions } from "../../store/slices/display-post/display-post";

function EditPostPage() {
  const { postId } = useParams() as { postId: string };
  const { post, isLoading } = useAppSelector((state) => ({
    post: state.editPost.post,
    isLoading: state.editPost.isLoading,
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
      });
    }
  }, [post, reset]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(editPostActions.getPost({ id: postId }));
  }, []);

  const handleEditPost = handleSubmit((data) => {
    fetch(`http://localhost:3000/post/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    dispatch(displayPostActions.getDisplayedPost({ id: postId }));
    navigate(`${AppRoute.POST}/${postId}`);
  });

  return (
    <div className="flex flex-col px-5 gap-5">
      <h1 className="text-6xl font-bold">Edit Post</h1>
      {isLoading && <h1>Loading...</h1>}
      {post && (
        <form
          onSubmit={handleEditPost}
          className="flex flex-col p-5 shadow-xl bg-white gap-4 w-full"
        >
          <div className="flex flex-col">
            <label className="text-4xl font-bold" htmlFor="title">
              Title:
            </label>
            <p className="text-teal-600">{errors.title?.message}</p>
            <input
              className="text-xl border p-1 rounded border-slate-400"
              type="text"
              {...register("title", {
                required: "title is required",
                minLength: {
                  value: 3,
                  message: "title should be at least 3 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "title can't be longer than 100 characters",
                },
              })}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-4xl font-bold" htmlFor="content">
              Content:
            </label>
            <p className="text-teal-600">{errors.content?.message}</p>
            <textarea
              className="text-xl border p-1 rounded border-slate-400 resize-none"
              rows={20}
              {...register("content", {
                required: "post's content is required",
                maxLength: {
                  value: 100000,
                  message: "content can't be longer than 100000 characters",
                },
              })}
            />
          </div>
          <Button label="edit post" />
        </form>
      )}
    </div>
  );
}

export { EditPostPage };
