import { Link, useNavigate } from "react-router";
import { AppRoute } from "../../../../../libs/enums/app-route.enum";
import { Button } from "../../../../../libs/components";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import { actions as authActions } from "../../../../../store/slices/auth/auth";
import { useCallback } from "react";

function Header() {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogInClick = useCallback(() => {
    navigate(AppRoute.LOG_IN);
  }, []);

  const handleLogOut = useCallback(() => {
    dispatch(authActions.clearProfile());
    navigate(AppRoute.LOG_IN);
  }, []);

  return (
    <div className="flex items-center justify-between w-full p-5">
      <Link className="text-4xl font-bold" to={AppRoute.FEED}>
        PlainBlog.
      </Link>
      {profile ? (
        <Button label="log out" onClick={handleLogOut} />
      ) : (
        <Button label="log in" onClick={handleLogInClick} />
      )}
    </div>
  );
}

export { Header };
