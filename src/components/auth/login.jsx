import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom';
import {useAuth} from "../../contexts/authContext/index";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
    const {userLoggedIn} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
            toast.success("Successfully Signed In");
        }catch(e){
            if(e.code === "auth/invalid-credential"){
                setErrorMessage("Invalid Email or Password");
            toast.error("Error Signing In");

            }
        }finally{
            setIsSigningIn(false);
        }
    }

    // const onGoogleSignIn = (e)=>{
    //     e.preventDefault();
    //     if(!isSigningIn){
    //         setIsSigningIn(true);
    //          doSignInWithGoogle().catch(err=>{
    //             setIsSigningIn(false);
    //          })
    //     }
    // }

    return (
        <div>
            {userLoggedIn && (<Navigate to="/howto" replace={true}/>)}
            <main className="w-full h-screen flex self-center place-content-center place-items-center white-text">
                <div className="w-96 white-text space-y-5 p-4 shadow-xl border rounded-xl center-vert" >
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="white-text text-xl font-semibold sm:text-2xl">Welcome back! <br/> Log in to continue</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                        style={{width: "90%"}}
                    >
                        <div>
                            <label className="text-sm white-text font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className=" mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                style={{width: "100%"}}
                            />
                        </div>


                        <div>
                            <label className="text-sm white-text font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
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
                    <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link></p>
                 
                </div>
            </main>

        </div>
    )
}

export default Login