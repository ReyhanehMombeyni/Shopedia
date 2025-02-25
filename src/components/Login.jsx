import { useForm } from "react-hook-form";
import Button from "./shared/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { client } from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema= yup.object({
  identifier: yup.string().required().email(),
  password: yup.string().required().min(8).max(12)
})

const Login = () => {
  const {register, handleSubmit, formState:{errors}}= useForm({
    resolver: yupResolver(schema),
  })
  const navigate= useNavigate();

  const submitForm= async (user) => {    
    try {
      const res=await client.post("/auth/local", user);
      const {status}= res;
      toast.success(`success! ${status}`)
      navigate("/")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" {...register("identifier")} className="grow" placeholder="Email" />
      </label>
      {errors.identifier && <span>{errors.identifier}</span>}
      <label className="input input-bordered flex items-center gap-2">
        <input type="password" {...register("password")} className="grow" placeholder="password" />
      </label>
      {errors.password && <span>{errors.password}</span>}
      <div>
        <Button type="submit" text="Log In" />
      </div>
      <ToastContainer />
    </form>
  );
};

export default Login;
