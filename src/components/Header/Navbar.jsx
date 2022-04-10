import React from "react";
import PokemonLogo from "../../assets/pokemon-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex w-10/12 lg:w-8/12 mx-auto justify-between items-center mt-5">
      <Link to="/">
        <img className="w-32 lg:w-[180px]" src={PokemonLogo} alt="" />
      </Link>
      <nav className="hidden lg:block">
        <ul className="flex gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Pokemon List</Link>
          </li>
          <li>My Collections</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

