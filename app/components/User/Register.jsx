"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoginForm from '../LoginForm';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: 'normal' });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            alert(response.data.message);            
            router.push('/login');
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <>
            <div className='flex items-center justify-center h-screen '>
                <form onSubmit={handleSubmit} className='flex flex-col  gap-3 bg-white backdrop-blur-sm bg-opacity-20 p-12 rounded-xl shadow-md w-full min-w-[500px]'>
                    <p className='text-2xl font-bold mb-4'>Register</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded w-full bg-transparent outline-none" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded w-full bg-transparent outline-none" />
                    <select
                        name="role"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded w-full bg-transparent outline-none ">
                        <option value="normal" className='text-black'>Normal</option>
                        <option value="admin" className='text-black'>Admin</option>
                    </select>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-700">Register</button>
                    <p className='text-sm hover:underline cursor-pointer w-fit' onClick={() => router.push("login")}>Login Now</p>
                </form>
            </div>
        </>
    );
};

export default Register;
