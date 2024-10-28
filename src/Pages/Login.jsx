import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Slice/userSlice"; // Assuming you have a loginUser action
import { ThreeCircles } from "react-loader-spinner";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { loading, error, success } = useSelector((state) => state.user);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      navigate("/recipe"); // Navigate to the recipe page
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]); // Added navigate to dependency array

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const isEmptyField = Object.values(values).some(
        (value) => value.trim() === ""
      );
      if (isEmptyField) {
        setFieldError("Please fill in all fields.");
        setShowError(true);
        const timer = setTimeout(() => setShowError(false), 2000);
        return () => clearTimeout(timer);
      }
      dispatch(loginUser(values));
      formik.resetForm();
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ThreeCircles
            height="100"
            width="100"
            color="#D6883C"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
        <div className="relative bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl max-w-sm w-full lg:max-w-md z-10 transform transition-transform hover:scale-105 duration-300">
          {/* Display Error Message */}
          {showError && (error || fieldError) && (
            <Alert color="failure" icon={HiInformationCircle} dismissible>
              <span className="font-medium">Error:</span> {error || fieldError}
            </Alert>
          )}
          {showSuccess && success && (
            <Alert color="success" icon={HiInformationCircle} dismissible>
              <span className="font-medium">Success:</span> Login successful!
            </Alert>
          )}
          <h1 className="text-3xl font-extrabold text-center text-amber-600 mb-6">
            Login
          </h1>

          <div
            className="absolute inset-0 bg-cover bg-center rounded-2xl opacity-10 blur-sm"
            style={{
              backgroundImage: `url("https://i.pinimg.com/564x/0a/3c/db/0a3cdbe05e53d438c098d9eedd41cd13.jpg")`,
            }}
          ></div>

          {/* Form */}
          <form
            className="space-y-6 relative z-20"
            onSubmit={formik.handleSubmit}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 mt-2 border rounded-lg shadow focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-[#D6883C]`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2 mt-2 border rounded-lg shadow focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-[#D6883C]`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-4 text-white rounded-lg transition-colors duration-200 ${
                loading ? "bg-gray-400" : "bg-[#D6883C] hover:bg-[#f6a83c]"
              }`}
            >
              {loading ? (
                <ThreeCircles
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="three-circles-loading"
                />
              ) : (
                "Login"
              )}
            </button>

            {/* Improved Links for Forgot Password and New User */}
            <div className="flex justify-between items-center mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-[#D6883C] hover:underline"
              >
                Forgot Password?
              </Link>
              <Link
                to="/register"
                className="text-sm text-[#D6883C] hover:underline"
              >
                New User? Create Account
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
