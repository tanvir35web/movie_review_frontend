import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [token, setToken] = useState("");
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
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        formData
      );
      setToken(response.data.token);
      document.cookie = `token=${response.data.token}; path=/`;
      document.cookie = `user_id=${response?.data?.user_details?.user_id}; path=/`;
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white backdrop-blur-sm bg-opacity-20 p-12 rounded-xl shadow-md w-full min-w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 outline-none bg-transparent"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 outline-none bg-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
            "Login"
          )}
        </button>
        <p
          onClick={() => {
            router.push("/register");
          }}
          className="mt-2 hover:underline text-sm cursor-pointer w-fit"
        >
          Register now
        </p>
      </form>
    </div>
  );
};

export default LoginComponent;
