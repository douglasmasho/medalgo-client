import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext/index'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { db } from '../../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useUser } from '../../contexts/userContext';
import { useDarkMode } from "../../contexts/darkModeContext"; // Import dark mode context

const Register = () => {
    const { isDarkMode } = useDarkMode(); // Access dark mode state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [fullName, setFullName] = useState("");
    const [title, setTitle] = useState("");
    const [role, setRole] = useState("");
    const [organization, setOrganization] = useState("");
    const [practiceNumber, setPracticeNumber] = useState("");

    const { currentUser, setCurrentUser } = useUser()
    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
                const uid = userCredential.user.uid;
                const userObj = {
                    title,
                    fullName,
                    email,
                    role,
                    organization,
                    uid,
                    profilePic: "https://i.ibb.co/z6xFjgk/defaultpic.png",
                    practiceNumber: practiceNumber,
                    patients: []
                }
                await setDoc(doc(db, "users", uid), userObj);
                setCurrentUser(userObj);
                toast.success("Successfully Created Account");
                localStorage.setItem("currentUser", userObj);
            } catch (e) {
                console.log(e);
                setErrorMessage(e.code);
                toast.error(e.code)
            } finally {
                setIsRegistering(false);
            }
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <main className={`w-full flex self-center place-content-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className={`mt-5 mb-5 p-4 shadow-xl border rounded-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}>
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                        style={{ width: "90%" }}
                    >
                        <div>
                            <label className="text-sm font-bold">Title</label>
                            <input
                                type="text"
                                autoComplete='title'
                                required
                                value={title} onChange={(e) => { setTitle(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold">Full Name</label>
                            <input
                                type="text"
                                autoComplete='full-name'
                                required
                                value={fullName} onChange={(e) => { setFullName(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold">Role</label>
                            <select
                                required
                                value={role}
                                onChange={(e) => { setRole(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="medical" className='black-text'>Medical Professional</option>
                                <option value="research" className='black-text'>Researcher</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-bold">Organization / Institution</label>
                            <input
                                type="text"
                                autoComplete='organization'
                                required
                                value={organization} onChange={(e) => { setOrganization(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </div>
                        {
                            role === "medical" ?
                                <div>
                                    <label className="text-sm font-bold">Practice Number</label>
                                    <input
                                        type="text"
                                        autoComplete='practice-number'
                                        required
                                        value={practiceNumber} onChange={(e) => { setPracticeNumber(e.target.value) }}
                                        className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                                    />
                                </div> : null
                        }
                        <div>
                            <label className="text-sm font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold">Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold">Confirm Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className={`w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register;
