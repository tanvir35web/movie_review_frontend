"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "normal",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        formData
      );
      alert(response.data.message);
      router.push("/login");
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  gap-3 bg-gray-800 backdrop-blur-lg bg-opacity-20 p-12 py-16 rounded-xl shadow-md w-full min-w-[600px]"
        >
          <p className="text-2xl font-bold mb-4">Register</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full bg-transparent outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full bg-transparent outline-none"
          />
          <select
            name="role"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full bg-transparent outline-none "
          >
            <option value="normal" className="text-black">
              Normal
            </option>
            <option value="admin" className="text-black">
              Admin
            </option>
          </select>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded w-full flex items-center justify-center hover:bg-blue-700 duration-200"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
          <p
            className="text-sm hover:underline cursor-pointer w-fit"
            onClick={() => router.push("login")}
          >
            Login Now
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
