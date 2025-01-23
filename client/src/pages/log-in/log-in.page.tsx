import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "../../libs/components";
import { AppRoute } from "../../libs/enums/app-route.enum";
import { validatePassword } from "../libs/helpers";
import { useAppDispatch } from "../../store/hooks";
import { actions as authActions } from "../../store/slices/auth/auth";

function LogInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full bg-slate-200">
      <h1 className="text-7xl font-bold">PlainBlog.</h1>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(authActions.logIn(data));
          navigate(AppRoute.FEED);
        })}
        className="flex flex-col p-5 shadow-xl bg-white gap-4 min-w-96"
      >
        <h2 className="text-4xl">Log in</h2>
        <p>
          don't have an account?{" "}
          <Link
            to={AppRoute.SIGN_UP}
            className="transform text-gray-400 hover:text-teal-600"
          >
            sign up
          </Link>
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-xl" htmlFor="username">
            username:
          </label>
          <input
            className="text-xl border p-1 rounded border-slate-400"
            type="text"
            {...register("username", {
              required: "username required",
              minLength: { value: 3, message: "minimal length is 3" },
              maxLength: { value: 15, message: "maximal length is 15" },
            })}
          />
          <p className="text-teal-600">{errors.username?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xl" htmlFor="password">
            password:
          </label>
          <input
            className="text-xl border p-1 rounded border-slate-400"
            type="password"
            {...register("password", {
              required: "password required",
              minLength: { value: 8, message: "minimal length is 8" },
              maxLength: { value: 20, message: "maximal length is 20" },
              validate: (value) => {
                return validatePassword(value);
              },
            })}
          />
          <p className="text-teal-600">{errors.password?.message}</p>
        </div>
        <Button label="submit" />
      </form>
    </div>
  );
}

export { LogInPage };
