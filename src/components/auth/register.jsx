import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext/index'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
console.log(db);


const Register = () => {

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

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true);
            try{
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;
            await setDoc(doc(db, "users", uid), {
                title,
                fullName,
                email,
                role,
                organization,
                uid
            })
            }catch(e){
                console.log(e);
                setErrorMessage(e.code)
            }finally{
                setIsRegistering(false);
            }
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/howto'} replace={true} />)}

            <main className="w-full white-text flex self-center place-content-center">
                <div className="mt-5 mb-5 text-gray-600  p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="white-text text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4 white-text"
                        style={{width: "90%"}}
                    >
                         <div>
                            <label className="text-sm white-text font-bold">
                                Title
                            </label>
                            <input
                                type="text"
                                autoComplete='title'
                                required
                                value={title} onChange={(e) => { setTitle(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-sm white-text font-bold">
                                Full Name
                            </label>
                            <input
                                type="text"
                                autoComplete='full-name'
                                required
                                value={fullName} onChange={(e) => { setFullName(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-sm white-text font-bold">
                                Role
                            </label>
                            <select
                                required
                                value={role}
                                onChange={(e) => { setRole(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="medical" className='black-text'>Medical Professional</option>
                                <option value="research" className='black-text'>Researcher</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm white-text font-bold">
                                Organization / Institution
                            </label>
                            <input
                                type="text"
                                autoComplete='organization'
                                required
                                value={organization} onChange={(e) => { setOrganization(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        {
                            role === "medical" ?
                            <div>
                            <label className="text-sm white-text font-bold">
                                Practice Number
                            </label>
                            <input
                                type="text"
                                autoComplete='practice-number'
                                required
                                value={practiceNumber} onChange={(e) => { setPracticeNumber(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                            </div>: null
                        }
                        <div>
                            <label className="text-sm white-text font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm white-text font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm white-text font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
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
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register