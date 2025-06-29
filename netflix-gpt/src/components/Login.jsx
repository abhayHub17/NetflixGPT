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

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
            photoURL: "https://avatars.githubusercontent.com/u/91273972?v=4",
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
              navigate("/browse");
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
          navigate("/browse");
          // console.log(user);
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
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg"
          alt="bg-img"
          className=""
        />
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
        {/* <span className="text-white text-center p-2">OR</span> */}
        {/* <button className="m-2 rounded-md p-2 bg-gray-600 text-white">
          Use a sign-in code
        </button> */}
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
