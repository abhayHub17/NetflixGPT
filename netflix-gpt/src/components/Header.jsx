import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handelSignOut = () =>
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // this unsubscribe will be called when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className=" flex justify-between w-screen h-16 bg-gradient-to-b from-black absolute z-10">
      <img src={LOGO_URL} alt="logo" className="w-48 " />
      {user && (
        <div className="flex ">
          <img src={user?.photoURL} className="m-2" />
          <button
            onClick={handelSignOut}
            className=" text-white mr-10 font-bold "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
