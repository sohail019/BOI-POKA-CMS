import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLoginSchema } from "@/schemas/auth/admin-schema";
import axios from "axios";
import { z } from "zod";
import { useDispatch } from "react-redux";

const AdminLoginForm = () => {
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof AdminLoginSchema>>({
    resolver: zodResolver(AdminLoginSchema),
  });

  const onSubmit = async (data: z.infer<typeof AdminLoginSchema>) => {
    try {
      const response = await axios.post("/admin/login", data);
      console.log(response.data);
      const { token } = response.data;

      // Store the token in localStorage
      dispatch(login(token));
      console.log("Login successful");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} className="input" />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default AdminLoginForm;
