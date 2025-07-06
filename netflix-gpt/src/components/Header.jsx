import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const langKey = useSelector((store) => store.config.lang);

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

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className=" flex justify-between w-screen h-16 bg-gradient-to-b from-black absolute z-10">
      <img src={LOGO_URL} alt="logo" className="w-48 " />
      {user && (
        <div className="flex ">
          <select
            className="m-4 px-4 bg-red-700 text-white rounded-sm py-2 h-10"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className="m-3 px-4 py-2 h-12  bg-purple-800 rounded-lg text-white font-bold "
            onClick={handleGPTSearchClick}
          >
            {!showGPTSearch
              ? lang[langKey].GPTSearchButton
              : lang[langKey].browseButton}
          </button>
          <img src={user?.photoURL} className="m-2" />
          <button
            onClick={handelSignOut}
            className=" text-white mr-10 font-bold "
          >
            {lang[langKey].signOut}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
