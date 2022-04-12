import React from "react";
import pokeball from "../assets/pokeball.svg";

function notFound() {
  return (
    <div className="w-10/12 lg:w-8/12 max-w-5xl mx-auto mt-20 flex items-center justify-center gap-4">
      <span className="text-5xl font-bold">4</span>
      <img className="w-1/12 animate-spin" src={pokeball} alt="" />
      <span className="text-5xl font-bold">4</span>
    </div>
  );
}

export default notFound;

