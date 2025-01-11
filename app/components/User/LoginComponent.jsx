import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [token, setToken] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, formData);
            setToken(response.data.token);
            document.cookie = `token=${response.data.token}; path=/`;
            router.push('/');
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={handleSubmit} className="bg-white backdrop-blur-sm bg-opacity-20 p-12 rounded-xl shadow-md w-full min-w-[500px]">
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
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
                <p onClick={() => { router.push("/register") }} className='mt-2 hover:underline text-sm cursor-pointer w-fit'>Register now</p>
            </form>


        </div>
    );
};

export default LoginComponent;
