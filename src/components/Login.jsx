import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { client } from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

import Button from "./shared/Button";
import imgShop from "../assets/imgShop.svg";

const schema = yup.object({
  identifier: yup.string().required().email(),
  password: yup.string().required().min(8).max(12),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const navigate = useNavigate();

  const submitForm = async (user) => {
    try {
      const res = await client.post("/auth/local", user);
      const { status } = res;
      toast.success(`success! ${status}`);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl my-20 w-120 mx-auto flex flex-col justify-center items-center">
      <div className="flex w-full">
        <div className="grow flex flex-col justify-end pl-10 gap-4">
          <p className="text-gray-400">Welcome back !!!</p>
          <h1 className="text-4xl font-bold">Login</h1>
        </div>
        <div className="grow">
          <img src={imgShop} alt="img Shop" className="w-60" />
        </div>
      </div>
      <form onSubmit={handleSubmit(submitForm)} className="w-full p-10">
        <div className="mb-5">
          <label>Email</label>
          <div className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              {...register("identifier")}
              className="grow"
              placeholder="Email"
            />
          </div>
          <span>{errors.identifier && <span className="text-error py-3">{errors.identifier.message}</span>}</span>
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
          <Button type="submit" text="LOG IN" />
        </div>
        <ToastContainer />
      </form>
      <div className="pb-10 flex gap-1">
        <p className="text-gray-400">I don’t have an account ?</p>
        <NavLink to="/signup" className="text-[#F47458]">Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;
