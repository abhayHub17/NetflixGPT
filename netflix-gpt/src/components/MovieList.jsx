/* eslint-disable no-unused-vars */
import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div className=" text-white">
      <h1 className="text-3xl m-2 font-bold">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide scroll-smooth">
        <div className="flex ">
          {movies?.map((movie) => (
            <MovieCards key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
