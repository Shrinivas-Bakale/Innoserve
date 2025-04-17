                <div className="bg-[#2A2A2A] py-6 flex justify-center">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2">
                        <MdHomeRepairService className="text-3xl text-[#4A90E2]" />
                        <h1 className='text-2xl font-bold text-white'>
                            Innoserve
                        </h1>
                    </button>
                </div>

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
                                type='submit'
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] hover:bg-[#3A7BC8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2]'
                            >
                                Sign in
                            </button>

                            <span className='text-gray-500'>Don't have an account?</span>{ ' ' }
<button
    onClick={() => navigate('/signup')}
    className='font-medium text-[#4A90E2] hover:text-[#3A7BC8]'
>
    Sign up
</button> 