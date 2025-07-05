import React from "react";
import { POSTER_IMG } from "../utils/constants";

const MovieCards = ({ posterPath }) => {
  return (
    <div className="w-48 m-2">
      <img src={POSTER_IMG + posterPath} alt="poster_img" />
    </div>
  );
};

export default MovieCards;
