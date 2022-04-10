import React from "react";
import { Link } from "react-router-dom";

function PokemonCard({ id, name }) {
  return (
    <Link to={`/pokemon/${name}`} className="">
      <div className="relative">
        <img
          className="w-full h-36"
          src={`${process.env.REACT_APP_IMAGE_URL}/${id}.svg`}
          alt={name}
        />
        {/* <span className=" absolute top-0 left-0 bg-yellow-400 py-1 px-2 text-sm font-bold">
          OWNED
        </span> */}
      </div>
      <div className="mt-6">
        <h1 className="text-center font-semibold">{name}</h1>
      </div>
    </Link>
  );
}

export default PokemonCard;

