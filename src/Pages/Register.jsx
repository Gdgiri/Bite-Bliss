import React, { useEffect, useState } from "react"; // Import useState and useEffect
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Slice/userSlice";
import { ThreeCircles } from "react-loader-spinner";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user);

  // Local state for managing message visibility
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldError, setFieldError] = useState(""); // State for field-specific errors

  // Effect to manage the visibility of messages
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000); // Hide after 2 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000); // Hide after 2 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [success]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "Must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Check for empty fields and set field error message if any are empty
      const isEmptyField = Object.values(values).some(
        (value) => value.trim() === ""
      );
      if (isEmptyField) {
        setFieldError("Please fill in all fields."); // Set field error
        setShowError(true); // Show error message
        const timer = setTimeout(() => setShowError(false), 2000); // Hide after 2 seconds
        return () => clearTimeout(timer); // Cleanup timer
      }
      dispatch(registerUser(values));
      resetForm();
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
              <span className="font-medium">Success:</span> Registration
              successful!
            
            </Alert>
          )}
          {showSuccess && success === false && (
            <Alert color="warning " icon={HiInformationCircle} dismissible>
              <span className="font-medium">Warning:</span> Please use a
              different email.
              
            </Alert>
          )}
          <h1 className="text-3xl font-extrabold text-center text-amber-600 mb-6">
            Register
          </h1>

          <div
            className="absolute inset-0 bg-cover bg-center rounded-2xl opacity-10 blur-sm"
            style={{
              backgroundImage: `url("https://i.pinimg.com/564x/0a/3c/db/0a3cdbe05e53d438c098d9eedd41cd13.jpg")`,
            }}
          ></div>

          <form
            className="space-y-6 relative z-20"
            onSubmit={formik.handleSubmit}
          >
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className={`w-full px-4 py-2 mt-2 border rounded-lg shadow focus:outline-none focus:ring-2 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-[#D6883C]`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className={`w-full px-4 py-2 mt-2 border rounded-lg shadow focus:outline-none focus:ring-2 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-[#D6883C]`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>

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

            {/* Register Button */}
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
                "Register"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
