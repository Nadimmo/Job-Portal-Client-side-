import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../../firebase.config";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service


    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {   
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }   

    const logOut = () => { 
        setLoading(true);
        return signOut(auth);
    }   




    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }   

    , []);

    const userInfo = {
        user,
        loading,
        signUp,
        signIn,
        logOut,
    };


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;    
