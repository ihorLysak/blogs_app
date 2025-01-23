import { Comment } from "../../../libs/types/comment.type";

interface Props {
  commentData: Comment;
}

function CommentCard({ commentData }: Props) {
  return (
    <div className="flex p-5 text-xl items-center bg-white w-full min-h-24">
      <p>{commentData.content}</p>
    </div>
  );
}

export { CommentCard };
