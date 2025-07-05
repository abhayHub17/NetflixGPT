/* eslint-disable no-unused-vars */
import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen pl-10 aspect-video pt-[15%] absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-6xl font-bold">{title}</h1>
      <h1 className="text-lg w-1/3 ">{overview}</h1>
      <button className="p-2 text-black font-bold  hover:opacity-80 hover:text-black mt-2 mr-2 w-40 rounded-md bg-white text-lg">
        Play
      </button>
      <button className="p-2 bg-[rgba(109,109,110,0.7)] hover:bg-[rgba(109,109,110,0.4)] font-bold text-lg text-white  mt-6 mr-2 w-40 rounded-md border-2 ">
        More Info
      </button>
    </div>
  );
};

export default VideoTitle;
