import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../../libs/components";
import { AppRoute } from "../../../libs/enums/app-route.enum";
import { actions as postsActions } from "../../../store/slices/posts/posts";
import { useAppDispatch } from "../../../store/hooks";

interface Props {
  postId: string;
}
function EditButtons({ postId }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteClick = useCallback(() => {
    fetch(`http://localhost:3000/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
      }),
    });

    dispatch(postsActions.getAllPosts());
    navigate(AppRoute.FEED);
  }, []);

  const handleEditClick = useCallback(() => {
    navigate(`${AppRoute.EDIT_POST}/${postId}`);
  }, []);
  return (
    <div className="flex gap-5">
      <Button label="edit" onClick={handleEditClick} />
      <Button label="delete" onClick={handleDeleteClick} />
    </div>
  );
}

export { EditButtons };
