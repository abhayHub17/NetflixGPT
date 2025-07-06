import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="text-white  w-1/2  bg-black ">
        <input
          className="m-2 p-4 w-[80%] text-black border border-black"
          type="text"
          placeholder={lang[langKey].GPTSearchPlaceholder}
        />
        <button className="px-8 py-4  bg-red-700 m-2 rounded-md">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
