import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }), // use actual user info
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
          });
      }

      setLoading(false);
    });

    return unsubscribe; // cleanup
  }, []);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();

  const continueWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //   const githubProvider = new GithubAuthProvider();

  //   const continueWithGithub = () => {
  //     return signInWithPopup(auth, githubProvider);
  //   };

  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserInfo = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const userInfo = {
    currentUser,
    createUser,
    signInUser,
    signOutUser,
    continueWithGoogle,
    updateUserInfo,
    forgetPassword,
  };

  return <AuthContext value={userInfo}>{!loading && children}</AuthContext>;
};

export default AuthProvider;
