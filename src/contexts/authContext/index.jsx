import { useContext, useEffect, useState, React, createContext } from "react";
import {auth} from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [ loading, setLoading] = useState(true);

    //empty dependency useEffect so you can set up a listener to auth state change
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, initializeUser) //this will automatically pass user info into the callback function
    }, [])

    const initializeUser = async(user)=>{
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false)
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return ( 
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;