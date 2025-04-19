import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,  getAuth, GoogleAuthProvider, onAuthStateChanged, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase.config";



export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
    auth.settings.appVerificationDisabledForTesting = true;


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

    const profileUpdate = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        });
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    }

    // Add this to AuthProvider:
    const phoneSignIn = (phoneNumber, recaptchaContainerId = "recaptcha-container") => {
        setLoading(true);
    
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                recaptchaContainerId,
                {
                    size: "normal", // or "normal" for visible
                    callback: (response) => {
                        console.log("reCAPTCHA verified");
                    },
                },
            );
        
        return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    };





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
        profileUpdate,
        googleSignIn,
        phoneSignIn,
    };


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;    
