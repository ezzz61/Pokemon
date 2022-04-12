import React, { useState, useEffect, useRef } from "react";
import PokemonCard from "../components/PokemonCard";
import ReactPaginate from "react-paginate";
import pokeball from "../assets/pokeball.svg";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/pokemon";

function HomePage() {
  const pokemonListElement = useRef();
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 20;
  let totalItem;

  const {
    loading,
    error,
    data: pokemonList,
    refetch,
  } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  });

  if (!loading) totalItem = pokemonList ? pokemonList.pokemons.count : {};

  const loadMore = (e) => {
    const total = e.selected * limit;
    setOffset(total % totalItem);
  };

  const scrollToList = () => {
    window.scrollTo({ behavior: "smooth", top: pokemonListElement.current.offsetTop });
  };

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

  useEffect(() => {
    if (totalItem) {
      setPageCount(Math.floor(Math.ceil(totalItem / limit)));
      let variables = { limit: 20, offset };
      refetch(variables);
    }
  }, [offset, limit, totalItem, refetch]);

  if (error) {
    return error;
  }

  return (
    <>
      <main className="w-10/12 lg:w-8/12 max-w-5xl mx-auto mt-20">
        <section className="xl:min-h-[50vh] w-full flex flex-col-reverse lg:flex-row justify-between">
          <div className="flex flex-col justify-center mt-14 lg:mt-0">
            <div className="">
              <h5 className="text-xl font-semibold">Pokeom Finder!</h5>
              <h1 className=" text-2xl lg:text-3xl xl:text-5xl font-bold mt-2 leading-snug">
                Find and <span className=" border-b-[5px] border-yellow-400">Catch!</span> <br />{" "}
                Collect best and rare <br /> pokemon!
              </h1>
            </div>
            <div className="bg-yellow-500 mt-12 w-6/12">
              <button
                onClick={scrollToList}
                className=" bg-yellow-400 w-full h-full py-1.5 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
              >
                Start Catching!
              </button>
            </div>
          </div>
          <div className="w-8/12 mx-auto lg:w-5/12">
            <img
              className="w-full h-full"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"
              alt="Charizard"
            />
          </div>
        </section>

        <section ref={pokemonListElement}>
          <div className="flex items-center justify-between mt-20">
            <h1 className="text-lg lg:text-3xl font-semibold uppercase ">Pokemon List</h1>
            <span className="font-medium">Owned Pokemon ({pokemons.length})</span>
          </div>
          <div className="">
            {!loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-16 gap-14">
                {pokemonList.pokemons?.results?.map((data, index) => (
                  <PokemonCard name={data.name} id={data.id} key={data.id} />
                ))}
              </div>
            ) : (
              <div className=" flex justify-center items-center min-h-[50vh] w-full">
                <img className="animate-spin" src={pokeball} alt="pokeball icon" />
              </div>
            )}
          </div>
        </section>
        {!loading && (
          <ReactPaginate
            className="flex justify-between mt-14 mx-auto lg:w-6/12"
            breakLabel="..."
            nextLabel=">"
            onPageChange={loadMore}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        )}
      </main>
    </>
  );
}

export default HomePage;

