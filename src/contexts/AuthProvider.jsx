import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
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
  };

  return <AuthContext value={userInfo}>{!loading && children}</AuthContext>;
};

export default AuthProvider;
