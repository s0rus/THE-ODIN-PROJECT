/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/config';
import defaultProfilePicture from '../images/default_profile_picture.png';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (
    email,
    password,
    username,
    name,
    surname,
    description,
  ) => {
    const createdUser = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    await createdUser.user.updateProfile({
      displayName: username,
      photoURL: defaultProfilePicture,
    });

    await firestore.collection('users').add({
      uid: createdUser.user.uid,
      username,
      profilePicture: defaultProfilePicture,
      name,
      surname,
      description,
      photos: [],
      following: [],
      followers: [],
    });
  };

  const updateProfile = async (doc, name, surname, description) => {
    await firestore
      .collection('users')
      .doc(doc[0].id)
      .update({
        name,
        surname,
        description,
      })
      .then(() => window.location.reload());
  };

  const updatePassword = async (password) => {
    await auth.currentUser.updatePassword(password);
  };

  const logIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const logOut = () => auth.signOut();

  useEffect(() => {
    const handleUserChange = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => handleUserChange();
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
