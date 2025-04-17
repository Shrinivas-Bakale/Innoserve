import React, { useEffect, useRef, useState } from 'react'
// import logo from "../assets/service-logo-template-design-vector_20029-567.avif"
import { IoCartOutline } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
// import { BsInstagram } from "react-icons/bs";
// import { BsWhatsapp } from "react-icons/bs";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseApp, useFirebase } from '../pages/firebase/firebase';
import { FaUser } from 'react-icons/fa'
import { MdHomeRepairService } from "react-icons/md";


const Navbar = () => {
    const navigate = useNavigate();
    const [loginButtonVisibility, setLoginButtonVisibility] = useState(true)
    const [user, setUser] = useState(null);
    const [profileDropdown, setProfileDropdown] = useState(false)

    const auth = getAuth(firebaseApp);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoginButtonVisibility(false)
                setUser(user)
            }
            else {
                setLoginButtonVisibility(true)
                setUser(null)
            }
        })
    }, [])

    const FirebaseContext = useFirebase()

    const userDropdownRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            setProfileDropdown(false);
        }
    };

    return (
        <div className='bg-[#2A2A2A] sticky top-0 z-30 shadow-lg'>
            <div className='container mx-auto px-4'>
                <nav className='py-3'>
                    <div className='flex justify-between items-center text-white'>
                        {/* Logo section */}
                        <div className='flex items-center'>
                            <button onClick={() => navigate("/")} className="flex items-center gap-2 transition-transform hover:scale-105">
                                <MdHomeRepairService className="text-3xl md:text-4xl text-[#4A90E2]" />
                                <h1 className='text-2xl md:text-3xl font-bold tracking-wide'>
                                    Innoserve
                                </h1>
                            </button>
                        </div>

                        {/* Right side navigation */}
                        <div className='flex items-center gap-5'>
                            {loginButtonVisibility ? (
                                <NavLink
                                    className="px-4 py-2 text-white hover:text-[#4A90E2] transition-colors font-medium"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            ) : null}

                            <NavLink
                                to="/cart"
                                className="relative p-2 hover:bg-gray-700 hover:text-[#4A90E2] rounded-full transition-colors"
                            >
                                <IoCartOutline className='text-2xl' />
                            </NavLink>

                            {!loginButtonVisibility && (
                                <div className='relative'>
                                    <button
                                        onClick={() => setProfileDropdown(!profileDropdown)}
                                        className='flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-full transition-colors'
                                    >
                                        <FaUser className='text-xl' />
                                        <svg
                                            className={`fill-current h-4 w-4 transform transition duration-150 ease-in-out ${profileDropdown ? "rotate-180" : "rotate-0"}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </button>

                                    {profileDropdown && (
                                        <div
                                            className='absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-xl z-50'
                                            ref={userDropdownRef}
                                        >
                                            <div className='p-3 border-b border-gray-200'>
                                                <p className='text-sm text-gray-500'>Signed in as</p>
                                                <p className='font-medium text-gray-800 truncate'>
                                                    {user.displayName || user.email}
                                                </p>
                                            </div>

                                            <div className='py-1'>
                                                <button
                                                    className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                                    onClick={() => { navigate("/profile"); setProfileDropdown(false); }}
                                                >
                                                    Your Profile
                                                </button>
                                            </div>

                                            <div className='py-1'>
                                                <button
                                                    className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                                    onClick={() => { navigate("/orders"); setProfileDropdown(false); }}
                                                >
                                                    Your Orders
                                                </button>
                                            </div>

                                            <div className='py-1 border-t border-gray-200'>
                                                <button
                                                    className='w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'
                                                    onClick={() => { signOut(auth); location.reload() }}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <NavLink
                                className='px-4 py-2 text-white bg-[#4A90E2] hover:bg-[#3A7BC8] text-gray-900 font-medium rounded-lg transition-colors'
                                to='/aboutus'
                            >
                                Get in touch
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
