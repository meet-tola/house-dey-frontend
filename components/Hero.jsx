"use client";
import { HomeIcon } from "lucide-react";
import Search from "./Search";
import React, { useState, useEffect } from "react";

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "You dey find House?",
    "Looking for a new home?",
    "Ṣe n wa ile?",
    "Ị na-achọ ụlọ?",
    "Kana neman gida?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-hero-bg bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="mx-auto mb-5 mt-[8rem] lg:mt-0 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full backdrop-blur-sm bg-white/30 px-7 py-2">
          <HomeIcon className="h-5 w-5 text-white" />
          <p className="text-sm font-semibold text-white">
            Finding Your Dream Home
          </p>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-black transition-opacity duration-1000 ease-in-out">
          {texts[textIndex]}
        </h1>
        <p className="text-sm md:text-lg text-gray-200 mt-4">
          Discover the perfect place to live, rent, or invest.
        </p>
        <div className="flex justify-center my-8 px-8">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Hero;
