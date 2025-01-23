import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "../../libs/components";
import { AppRoute } from "../../libs/enums/app-route.enum";
import { validatePassword } from "../libs/helpers";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const handleSignUp = handleSubmit((data) => {
    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    navigate(AppRoute.LOG_IN);
  });

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full bg-slate-200">
      <h1 className="text-7xl font-bold">PlainBlog.</h1>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col p-5 shadow-xl bg-white gap-4 min-w-96"
      >
        <h2 className="text-4xl">Sign up</h2>
        <p>
          already have an account?{" "}
          <Link
            to={AppRoute.LOG_IN}
            className="transform text-gray-400 hover:text-teal-600"
          >
            log in
          </Link>
        </p>
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
          <label className="text-xl" htmlFor="password">
            confirm password:
          </label>
          <input
            className="text-xl border p-1 rounded border-slate-400"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password required",
              validate: (value) => {
                return value === watch("password") || "Passwords must match";
              },
            })}
          />
          <p className="text-teal-600">{errors.confirmPassword?.message}</p>
        </div>
        <Button label="submit" />
      </form>
    </div>
  );
}

export { SignUpPage };
