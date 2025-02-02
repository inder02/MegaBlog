import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import Logo from "./logo";
import { useForm } from "react-hook-form";
import { Button, Input, Login } from "./index";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) dispatch(authLogin(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl border border-black/10 p-10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] ">
            <Logo width="100px" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create Your Account
        </h2>
        <p className="mt-2 text-center text-base text-black">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline transition-all duration-200 ease-in-out"
          >
            Sign up
          </Link>
        </p>
        {error && (
          <p className="mt-8 text-center text-base text-red-600">{error}</p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name: "
              type="Name"
              placeholder="Enter your Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/.test(value) ||
                    "email must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
