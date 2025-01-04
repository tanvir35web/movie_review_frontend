// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios'; // You'll need axios for making HTTP requests
import { useRouter } from 'next/navigation';

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: check if fields are empty
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        // Reset error message if form is valid
        setError('');

        try {
            // Make login request to backend API
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            // Check if login is successful
            if (response.status === 200) {
                // Store the user data (e.g., token, user role)
                setUser(response.data);  // Assuming the backend returns user info
                localStorage.setItem('token', response.data.token); // Save token in local storage
            }
        } catch (err) {
            // Handle errors (e.g., incorrect credentials)
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="w-[600px] mx-auto px-8 py-12 bg-white bg-opacity-15 backdrop-blur-[5px] rounded-lg shadow-md border border-gray-300 border-opacity-35" >

            <h2 className="text-4xl font-bold text-center mb-8">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-50" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 bg-gray-500 bg-opacity-25 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-50" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 bg-gray-500 bg-opacity-25 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Login
                </button>
                <div className='mt-2'>
                    <p onClick={() => {router.push("/register-user")}} className='cursor-pointer hover:underline'> Create a new account </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
