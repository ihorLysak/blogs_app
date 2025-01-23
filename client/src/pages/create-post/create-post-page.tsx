import { useNavigate } from "react-router";
import { Button } from "../../libs/components";
import { AppRoute } from "../../libs/enums/app-route.enum";
import { useForm } from "react-hook-form";
import { actions as postsActions } from "../../store/slices/posts/posts";
import { useAppDispatch } from "../../store/hooks";

function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreatePost = handleSubmit((data) => {
    dispatch(
      postsActions.createPost({ title: data.title, content: data.content })
    );
    navigate(AppRoute.FEED);
    dispatch(postsActions.getAllPosts());
  });

  return (
    <div className="flex flex-col px-5 gap-5">
      <h1 className="text-6xl font-bold">New Post</h1>
      <form
        onSubmit={handleCreatePost}
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
        <Button label="create post" />
      </form>
    </div>
  );
}

export { CreatePostPage };
