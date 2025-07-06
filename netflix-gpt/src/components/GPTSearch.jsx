import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { LOGIN_BG } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <div className="-z-10 absolute min-h-screen overflow-hidden w-full h-full object-cover">
        <img src={LOGIN_BG} alt="bg-img" className="" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
