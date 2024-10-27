import React from "react";

const Reset = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl max-w-sm w-full lg:max-w-md z-10 transform transition-transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-extrabold text-center text-amber-600 mb-6">
          Reset Password
        </h1>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl opacity-10 blur-sm"
          style={{
            backgroundImage: `url("https://i.pinimg.com/564x/0a/3c/db/0a3cdbe05e53d438c098d9eedd41cd13.jpg")`,
          }}
        ></div>

        {/* Form */}
        <form className="space-y-6 relative z-20">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#D6883C]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#D6883C]"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-[#C57844] rounded-lg shadow-lg hover:bg-[#D6883C] transform transition-transform duration-200 hover:scale-105"
          >
            Reset Password
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center relative z-20">
          <p className="text-sm">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-[#C57844] font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
