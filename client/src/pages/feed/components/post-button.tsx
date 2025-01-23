import { Link } from "react-router";
import { AppRoute } from "../../../libs/enums/app-route.enum";

interface Props {
  title: string;
  author: string;
  postId: string;
}

function PostButton({ title, author, postId }: Props) {
  return (
    <Link
      to={`${AppRoute.POST}/${postId}`}
      className="flex items-center justify-between w-full bg-white h-44 p-5 shadow-xl"
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-xl font-medium text-teal-600">author: {author}</p>
    </Link>
  );
}

export { PostButton };
