import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "../lib/axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import Button from "./shared/Button";
import imgShop from "../assets/imgShop.svg"
import { NavLink } from "react-router-dom";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(12),
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
    // <form action="" onSubmit={handleSubmit(submitForm)}>
    //   <label className="input input-bordered flex items-center gap-2">
    //     <input
    //       type="text"
    //       {...register("username")}
    //       className="grow"
    //       placeholder="Name"
    //     />
    //   </label>
    //   {errors.username && <span>{errors.username.message}</span>}
    //   <label className="input input-bordered flex items-center gap-2">
    //     <input
    //       type="text"
    //       {...register("email")}
    //       className="grow"
    //       placeholder="Email"
    //     />
    //   </label>
    //   {errors.email && <span>{errors.email.message}</span>}
    //   <label className="input input-bordered flex items-center gap-2">
    //     <input
    //       type="password"
    //       {...register("password")}
    //       className="grow"
    //       placeholder="Password"
    //     />
    //   </label>
    //   {errors.password && <span>{errors.password.message}</span>}
    //   <div>
    //     <Button type="submit" text="Sign Up" />
    //   </div>
    //   <ToastContainer />
    // </form>
    <div className="bg-white rounded-2xl shadow-2xl my-20 w-120 mx-auto flex flex-col justify-center items-center">
    <div className="flex w-full">
      <div className="grow flex flex-col justify-end pl-10 gap-4">
        <h1 className="text-4xl font-bold">Sign in</h1>
      </div>
      <div className="grow">
        <img src={imgShop} alt="img Shop" className="w-60" />
      </div>
    </div>
    <form onSubmit={handleSubmit(submitForm)} className="w-full p-10">
      <div className="mb-5">
        <label>User Name</label>
        <div className="input input-bordered flex items-center gap-2 w-full">
        <input
          type="text"
          {...register("username")}
          className="grow"
          placeholder="Name"
        />
        </div>
        <span>{errors.username && <span className="text-error py-3">{errors.username.message}</span>}</span>
      </div>
      <div className="mb-5">
        <label>Email</label>
        <div className="input input-bordered flex items-center gap-2 w-full">
        <input
          type="text"
          {...register("email")}
          className="grow"
          placeholder="Email"
        />
        </div>
        <span>{errors.email && <span className="text-error py-3">{errors.email.message}</span>}</span>
      </div>
      <div>
        <div className="flex justify-between">
          <label>Password</label>
          <span className="text-gray-400">Forget Password?</span>
        </div>
        <div className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="password"
            {...register("password")}
            className="grow"
            placeholder="password"
          />
        </div>
        <span>{errors.password && <span className="text-error py-3">{errors.password.message}</span>}</span>
      </div>
      <div className="text-center pt-7">
        <Button type="submit" text="SIGN IN" />
      </div>
      <ToastContainer />
    </form>
    <div className="pb-10 flex gap-1">
      <p className="text-gray-400">Already have an account ?</p>
      <NavLink to="/login" className="text-[#F47458]">Log In</NavLink>
    </div>
  </div>
  );
};

export default SignUp;
