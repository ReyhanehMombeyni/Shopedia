import Button from "./shared/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "../lib/axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const submitForm = async (user) => {
    try {
      const res = await client.post("/auth/local/register", user);
      localStorage.setItem("token", res.data.jwt);
      toast.success("success!");
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          {...register("username")}
          className="grow"
          placeholder="Name"
        />
      </label>
      {errors.username && <span>{errors.username.message}</span>}
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          {...register("email")}
          className="grow"
          placeholder="Email"
        />
      </label>
      {errors.email && <span>{errors.email.message}</span>}
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="password"
          {...register("password")}
          className="grow"
          placeholder="Password"
        />
      </label>
      {errors.password && <span>{errors.password.message}</span>}
      <div>
        <Button type="submit" text="Sign Up" />
      </div>
      <ToastContainer />
    </form>
  );
};

export default SignUp;
