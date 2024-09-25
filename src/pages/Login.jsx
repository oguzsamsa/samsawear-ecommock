import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { login } from "../redux/actions/thunkActions";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitError, setSubmitError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      dispatch(
        login(formData.email, formData.password, formData.rememberMe, history)
      );
    } catch (error) {
      setSubmitError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="font-display flex flex-col md:flex-row items-center justify-center md:py-12">
      <div className="w-3/4 md:w-1/3 mx-auto mb-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-center text-gray-600 ">
          Welcome back! Please log in to continue.
        </p>
        <img
          src="../../assets/about-page/about-page-hero.png"
          alt=""
          className="max-md:hidden"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-1/2 md:max-w-sm lg:max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-second-text-color">
            Email
          </label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
          />
          {errors.email && (
            <span className="text-danger-text-color text-sm">
              Email is required and must be a valid email address.
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-second-text-color">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
          />
          {errors.password && (
            <span className="text-danger-text-color text-sm">
              Password is required.
            </span>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="mr-2 leading-tight"
          />
          <label className="text-sm text-gray-700">Remember Me</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-color mb-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 sm:text-sm"
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>

        {submitError && (
          <span className="text-danger-text-color text-sm">{submitError}</span>
        )}

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-color hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
