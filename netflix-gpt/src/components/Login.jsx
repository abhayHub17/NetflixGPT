/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVATAR_URL, LOGIN_BG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    let errMessage = checkValidData(
      isSignInForm ? "Valid Name" : name.current?.value || "",
      email.current.value,
      password.current.value
    );
    setErrorMessage(errMessage);

    if (errMessage) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVATAR_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div className="">
      <Header />
      <div className="absolute min-h-screen overflow-hidden w-full h-full object-cover">
        <img src={LOGIN_BG} alt="bg-img" className="" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute rounded-md p-12 bg-black w-1/3 flex flex-col my-36 mx-auto left-0 right-0 bg-opacity-80 "
      >
        {isSignInForm ? (
          <h1 className="text-white font-bold text-3xl mx-3">Sign in</h1>
        ) : (
          <h1 className="text-white font-bold text-3xl mx-3">Sign Up</h1>
        )}
        {!isSignInForm && (
          <input
            ref={name}
            id="name"
            className="m-3 p-3 bg-transparent rounded-md text-white border-2 border-gray-400"
            type="name"
            placeholder="Full Name"
            required
          />
        )}
        <input
          id="email"
          ref={email}
          className="m-3 p-3 bg-transparent rounded-md text-white border-2 border-gray-400"
          type="email"
          placeholder="Email or Mobile number"
          required
        />
        <input
          id="password"
          ref={password}
          className="m-3 p-3 rounded-md bg-transparent text-white border-2 border-gray-400"
          type="password"
          placeholder="Password"
          required
        />
        <p className="text-red-600 m-2 font-bold">{errorMessage}</p>
        <button
          className="m-2 p-2 rounded-md bg-red-700 text-white"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        {isSignInForm && (
          <p className="text-gray-400 p-2 m-2">
            New to Netflix?
            <span
              className="text-white p-2 font-bold hover:cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign Up
            </span>
          </p>
        )}
        {!isSignInForm && (
          <p className="text-gray-400 p-2 m-2">
            Already a user?
            <span
              className="text-white p-2 font-bold hover:cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign In
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
