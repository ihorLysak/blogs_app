import { Button } from "../../../libs/components";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import { actions as displayPostActions } from "../../../store/slices/display-post/display-post";

interface Props {
  postId: string;
}

function CreateCommentForm({ postId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const dispatch = useAppDispatch();

  const handleCreateComment = handleSubmit((data) => {
    dispatch(
      displayPostActions.createComment({ postId, content: data.content })
    );
  });
  return (
    <form
      onSubmit={handleCreateComment}
      className="flex flex-col p-5 shadow-xl bg-white gap-4 min-w-96"
    >
      <label className="text-2xl font-bold" htmlFor="content">
        write a comment:
      </label>
      <p className="text-teal-600">{errors.content?.message}</p>
      <div className="flex w-full gap-10">
        <input
          className="text-xl border p-1 rounded border-slate-400 grow"
          type="text"
          {...register("content", {
            required: "comment should not be empty",
            minLength: {
              value: 10,
              message: "comment should be at least 10 characters long",
            },
            maxLength: {
              value: 10000,
              message: "comment should not be more than 10,000 characters long",
            },
          })}
        />
        <Button label="submit" />
      </div>
    </form>
  );
}

export { CreateCommentForm };
