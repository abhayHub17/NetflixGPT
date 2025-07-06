/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies); //We will get all the nowPlayingMovies from the store

  if (!movies) return;
  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
