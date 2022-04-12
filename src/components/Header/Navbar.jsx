import React, { useState } from "react";
import PokemonLogo from "../../assets/pokemon-logo.png";
import { Link } from "react-router-dom";
import navBurger from "../../assets/burger.svg";

function Navbar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="flex w-10/12  lg:w-8/12 max-w-5xl mx-auto justify-between items-center mt-5">
      {/* overlay */}
      <div
        onClick={() => {
          setShowNav(false);
        }}
        className={`${
          showNav ? "fixed" : "hidden"
        } w-full h-full top-0 bottom-0 left-0 z-40 bg-black/50`}
      ></div>

      <Link to="/">
        <img className="w-32 lg:w-[180px]" src={PokemonLogo} alt="pokemon logo" />
      </Link>
      <button
        className="md:hidden"
        onClick={() => {
          setShowNav((prevVal) => !prevVal);
        }}
      >
        <img src={navBurger} alt="hamburger icon" />
      </button>
      <nav
        className={`bg-yellow-400 h-full fixed md:relative top-0 bottom-0 right-0 z-50  md:bg-transparent transition-all duration-500   ${
          showNav ? "translate-x-0" : "translate-x-[100vh] md:translate-x-0"
        }`}
      >
        <ul className="flex flex-col md:flex-row h-full mt-[40%] md:mt-0  font-semibold  items-center w-72 lg:w-full gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Pokemon List</Link>
          </li>
          <li>
            <Link to="/my-collections">My Collections</Link>
          </li>
          <li className="mt-[80%] w-full flex justify-center md:hidden">
            <button
              onClick={() => {
                setShowNav(false);
              }}
              className="bg-white w-10/12 py-2 font-semibold "
            >
              Close
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

