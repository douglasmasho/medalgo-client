import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from "../../contexts/authContext/index";
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import toast from 'react-hot-toast';
import { useDarkMode } from "../../contexts/darkModeContext"; // Import dark mode context

const Login = () => {
    const { userLoggedIn } = useAuth();
    const { isDarkMode } = useDarkMode(); // Access dark mode state

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
            toast.success("Successfully Signed In");
        } catch (e) {
            if (e.code === "auth/invalid-credential") {
                setErrorMessage("Invalid Email or Password");
                toast.error("Error Signing In");
            }
        } finally {
            setIsSigningIn(false);
        }
    }

    return (
        <div className={`w-full h-screen flex self-center place-content-center place-items-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {userLoggedIn && (<Navigate to="/" replace={true} />)}
            <main className="w-full h-screen flex self-center place-content-center place-items-center white-text">
                <div className={`w-96 space-y-5 p-4 shadow-xl border rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition duration-300`}>
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className={`text-xl font-semibold sm:text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                Welcome back! <br /> Log in to continue
                            </h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                        style={{ width: "90%" }}
                    >
                        <div>
                            <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className={`mt-2 px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-transparent border'} outline-none focus:border-indigo-600 shadow-sm rounded-lg transition duration-300`}
                                style={{ width: "100%" }}
                            />
                        </div>

                        <div>
                            <label className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-transparent border'} outline-none focus:border-indigo-600 shadow-sm rounded-lg transition duration-300`}
                            />
                        </div>

                        {errorMessage && (
                            <p className='text-red-600 font-bold center-text'>{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className={`text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Login;
