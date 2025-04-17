import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';
import { firebaseApp } from '../firebase/firebase'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaGoogle } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    const auth = getAuth(firebaseApp)
    const googleProvider = new GoogleAuthProvider();

    const login = (e) => {
        e.preventDefault();
        toast.loading('Logging in...');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                toast.dismiss();
                toast.success("Logged in successfully!")
                setTimeout(() => {
                    navigate('/')
                }, 700)
            })
            .catch((error) => {
                toast.dismiss();
                toast.error(error.message)
            })
    }

    const signUpWithGoogle = () => {
        toast.loading('Connecting to Google...');
        signInWithPopup(auth, googleProvider).then((result) => {
            toast.dismiss();
            toast.success("Signed in with Google")
            setTimeout(() => {
                navigate('/')
            }, 700)
        })
            .catch((error) => {
                toast.dismiss();
                toast.error(error.message)
            })
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <Toaster position="top-right" toastOptions={{
                duration: 3000,
                style: {
                    background: '#333',
                    color: '#fff',
                }
            }} />

            <div className='max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden'>
                {/* Header */}
                <div className='bg-[#2A2A2A] py-6 flex justify-center'>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2">
                        <MdHomeRepairService className="text-3xl text-[#4A90E2]" />
                        <h1 className='text-2xl font-bold text-white'>
                            Innoserve
                        </h1>
                    </button>
                </div>

                <div className='px-8 py-8'>
                    <div className='text-center mb-8'>
                        <h2 className='text-3xl font-extrabold text-gray-900'>
                            Sign in to your account
                        </h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            Access your services and bookings
                        </p>
                    </div>

                    <form className='space-y-6' onSubmit={login}>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email address
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4A90E2] focus:border-[#4A90E2] sm:text-sm'
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                Password
                            </label>
                            <div className='mt-1 relative'>
                                <input
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete='current-password'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4A90E2] focus:border-[#4A90E2] sm:text-sm pr-10'
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ?
                                        <FaRegEyeSlash className='h-5 w-5 text-gray-400' /> :
                                        <FaRegEye className='h-5 w-5 text-gray-400' />
                                    }
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] hover:bg-[#3A7BC8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2]'
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className='mt-6'>
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-300'></div>
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button
                                onClick={signUpWithGoogle}
                                className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                            >
                                <FaGoogle className='h-5 w-5 text-[#4285F4] mr-2' />
                                Sign in with Google
                            </button>
                        </div>
                    </div>

                    <div className='mt-6 flex items-center justify-center'>
                        <div className='text-sm'>
                            <span className='text-gray-500'>Don&apos;t have an account?</span>{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className='font-medium text-[#4A90E2] hover:text-[#3A7BC8]'
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
