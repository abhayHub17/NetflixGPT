/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import lang from "../utils/languageConstants";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="bg-black w-screen">
      <div className="-mt-72 relative z-20">
        <MovieList
          title={lang[langKey].nowPlaying}
          movies={movies.nowPlayingMovies}
        />
        <MovieList
          title={lang[langKey].topRated}
          movies={movies.topRatedMovies}
        />
        <MovieList
          title={lang[langKey].popular}
          movies={movies.popularMovies}
        />
        <MovieList
          title={lang[langKey].upcoming}
          movies={movies.upcomingMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
