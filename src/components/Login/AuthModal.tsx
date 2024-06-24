import React, { useState } from 'react';
import { registerUser, loginUser, getTasks } from '../../lib/api';
import Image from 'next/image';
import loginImage from '../../../public/image-login.png';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const data = await registerUser(formData);
            onClose();
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const data = await loginUser(formData);
            localStorage.setItem('token', data.token);
            await getTasks();
            onLogin();
            onClose();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const toggleMode = () => {
        setIsRegistering(prev => !prev);
    };

    if (!open) return null;

    return (
        <div className="modalBackdrop w-screen">
            <div className="modalContent w-80 px-6 py-10 lg:w-full lg:h-full">
                <button className="closeButton text-montserrat font-bold" onClick={onClose}>
                    close
                </button>
                <div className='flex justify-center align-center'>
                    <div className='header-login flex items-center justify-center flex-col text-center lg:flex-row'>
                        <Image
                            src={loginImage}
                            alt="Login image"
                            className='w-28 lg:w-full login-image'
                        />
                        <div className='title-login lg:text-left'>
                            <h2 className='text-black font-bold font-montserrat text-2xl lg:text-7xl'>Sign in</h2>
                            <span className='text-green-primary font-normal font-montserrat text-xl lg:text-5xl'>to access your list</span>
                        </div>
                    </div>
                </div>
                {isRegistering ? (
                    <form className="form-login flex flex-col lg:mx-auto">
                        <label className='text-black font-bold font-montserrat pb-1'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-lg border p-1.5"
                        />
                        <label className='text-black font-bold font-montserrat pb-1 mt-4'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-lg border p-1.5"
                        />
                        <label className='text-black font-bold font-montserrat pb-1 mt-4'>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="rounded-lg border p-1.5"
                        />
                        <label className='text-black font-bold font-montserrat pb-1 mt-4'>Confirm password:</label>
                        <input
                            type="password"
                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            className="rounded-lg border p-1.5"
                        />
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="py-2 px-4 bg-green-primary font-montserrat font-bold text-white cursor-pointer mt-5 lg:mx-auto lg:w-full"
                        >
                            Sign in
                        </button>
                        <p className="mt-4 text-center">
                            Already have an account?{' '}
                            <button
                                onClick={toggleMode}
                                className="text-blue-500 underline focus:outline-none"
                            >
                                log in
                            </button>
                        </p>
                    </form>
                ) : (
                    <div className='login'>
                        <form className="form-login flex flex-col lg:mx-auto lg:align-center lg:mt-12">
                            <label className='text-black font-bold font-montserrat pb-1'>User:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="rounded-lg border p-1.5"
                            />
                            <label className='text-black font-bold font-montserrat mt-4 pb-1'>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="rounded-lg border p-1.5"
                            />
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="py-2 px-4 bg-green-primary font-montserrat font-bold text-white cursor-pointer mt-5 lg:mx-auto lg:w-full lg:mt-6 lg:text-2xl lg:py-4 lg:mt-14"
                            >
                                Login
                            </button>
                            <p className="mt-4 text-center">
                                Don&apos;t have an account? {' '}
                                <button
                                    onClick={toggleMode}
                                    className="text-blue-500 underline focus:outline-none"
                                >
                                    Register
                                </button>
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
