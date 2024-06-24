import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../redux/actions/thunkActions";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitError, setSubmitError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.client.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const onSubmit = async (formData) => {
    try {
      let sendData = {};
      if (formData.role_id === "customer" || formData.role_id === "admin") {
        sendData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role_id: formData.role_id,
        };
      } else if (formData.role_id === "store") {
        sendData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role_id: formData.role_id,
          store: {
            name: formData.store?.name,
            phone: formData.store?.phone,
            tax_no: formData.store?.tax_no,
            bank_account: formData.store?.bank_account,
          },
        };
      }

      const response = await axiosInstance.post("/signup", sendData);
      history.goBack();
    } catch (error) {
      setSubmitError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="font-display flex flex-col md:flex-row items-center justify-center md:py-12">
      <div className="w-3/4 md:w-1/3 mx-auto mb-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <p className="text-center text-gray-600 ">
          Welcome to our e-commerce platform. Register now to start shopping
          with exclusive offers and deals!
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
            Name
          </label>
          <input
            {...register("name", { required: true, minLength: 3 })}
            className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
          />
          {errors.name && (
            <span className="text-danger-text-color text-sm">
              Name is required and must be at least 3 characters.
            </span>
          )}
        </div>

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
            {...register("password", { required: true, minLength: 8 })}
            className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
          />
          {errors.password && (
            <span className="text-danger-text-color text-sm">
              Password is required and must be at least 8 characters.
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-second-text-color">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
          />
          {errors.confirmPassword && (
            <span className="text-danger-text-color text-sm">
              Please confirm your password.
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-second-text-color">
            Role
          </label>
          <select
            {...register("role_id", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.code}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <span className="text-danger-text-color text-sm">
              Please select a role.
            </span>
          )}
        </div>

        {watch("role_id") === "store" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-second-text-color">
                Store Name
              </label>
              <input
                {...register("store.name", { required: true, minLength: 3 })}
                className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
              {errors.store?.name && (
                <span className="text-danger-text-color text-sm">
                  Store name is required and must be at least 3 characters.
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-second-text-color">
                Store Phone
              </label>
              <input
                {...register("store.phone", {
                  required: true,
                  pattern: /^(\+?90|0)?\d{10}$/,
                })}
                className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
              {errors.store?.phone && (
                <span className="text-danger-text-color text-sm">
                  Please enter a valid Turkish phone number.
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-second-text-color">
                Store Tax ID
              </label>
              <input
                {...register("store.tax_no", {
                  required: true,
                  pattern: /^T\d{4}V\d{6}$/,
                })}
                className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
              {errors.store?.tax_no && (
                <span className="text-danger-text-color text-sm">
                  Please enter a valid tax ID matching the pattern TXXXXVXXXXXX.
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-second-text-color">
                Store Bank Account
              </label>
              <input
                {...register("store.bank_account", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-second-text-color rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
              {errors.store?.bank_account && (
                <span className="text-danger-text-color text-sm">
                  Please enter a valid IBAN bank account number.
                </span>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-color mb-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 sm:text-sm"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {submitError && (
          <span className="text-danger-text-color text-sm">{submitError}</span>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
