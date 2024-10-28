import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Slice/userSlice";
import { ThreeCircles } from "react-loader-spinner"; // Import the loader component

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  // Form validation schema
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

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Dispatch the registerUser action
      dispatch(registerUser(values));
      // Reset the form fields after submission
      resetForm();
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      {loading ? (
        // Show the loader when loading
        <div className="flex items-center justify-center min-h-screen">
          <ThreeCircles
            height="100"
            width="100"
            color="#D6883C"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        // Show the registration form when not loading
        <div className="relative bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl max-w-sm w-full lg:max-w-md z-10 transform transition-transform hover:scale-105 duration-300">
          <h1 className="text-3xl font-extrabold text-center text-amber-600 mb-6">
            Register
          </h1>

          {/* Background Image */}
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

            {/* Display Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`w-full py-2 mt-4 font-semibold text-white rounded-lg shadow-lg ${
                loading ? "bg-gray-400" : "bg-[#C57844] hover:bg-[#D6883C]"
              } transform transition-transform duration-200 hover:scale-105`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center relative z-20">
            <p className="text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#C57844] font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
