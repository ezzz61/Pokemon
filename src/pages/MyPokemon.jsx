import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonCardDetails from "../components/PokemonCardDetails";

function MyPokemon() {
  const [pokemons, setPokemons] = useState([]);

  const getCurrentPokemon = () => {
    const getCurrentPokemonData = localStorage.getItem("pokemons");
    if (getCurrentPokemonData) {
      const parseData = JSON.parse(getCurrentPokemonData);
      setPokemons(parseData);
    } else {
      setPokemons([]);
    }
  };

  useEffect(() => {
    getCurrentPokemon();
  }, []);

  return (
    <main className="w-10/12 lg:w-8/12 max-w-5xl mx-auto mt-20">
      <h1 className=" text-lg lg:text-3xl text-center uppercase font-semibold">My Pokemons</h1>
      <div className="min-h-[50vh]  mt-20">
        {pokemons.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-14">
            {pokemons.map((data) => (
              <PokemonCardDetails
                refetchPokemons={getCurrentPokemon}
                name={data.nickname}
                id={data.id}
                key={data.identifier}
                identifier={data.identifier}
              />
            ))}
          </div>
        ) : (
          <div className="">
            <h1 className="text-center">You dont have pokemon!</h1>
            <div className="w-2/12 mx-auto mt-8">
              <div className="bg-yellow-500 mt-2 ">
                <button className=" bg-yellow-400 w-full h-full py-1 px-3 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all">
                  <Link to="/">Lets Catch em!</Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyPokemon;

