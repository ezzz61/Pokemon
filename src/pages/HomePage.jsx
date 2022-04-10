import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import ReactPaginate from "react-paginate";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/pokemon";

function HomePage() {
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

  if (!loading) totalItem = pokemonList.pokemons.count;

  const loadMore = (e) => {
    const total = e.selected * limit;
    setOffset(total % totalItem);
  };

  useEffect(() => {
    setPageCount(Math.floor(Math.ceil(totalItem / limit)));
    let variables = { limit: 20, offset };
    refetch(variables);
  }, [offset, limit]);

  return (
    <>
      <main className=" w-10/12 lg:w-8/12 mx-auto mt-40 lg:mt-20">
        <section className="h-[50vh] w-full flex flex-col-reverse lg:flex-row justify-between">
          <div className="flex flex-col justify-center mt-8 lg:mt-0">
            <div className="">
              <h5 className="text-xl font-semibold">Pokeom Finder!</h5>
              <h1 className=" text-2xl lg:text-5xl font-bold mt-2 leading-snug">
                Find and <span className=" border-b-[5px] border-yellow-400">Catch!</span> <br />{" "}
                Collect best and rare <br /> pokemon!
              </h1>
            </div>
            <div className="mt-10">
              <button className="bg-yellow-400 border-2 border-blue-800 text-blue-800 font-bold py-2 px-10">
                CATCH POKEMON!
              </button>
            </div>
          </div>
          <div className="lg:w-5/12">
            <img
              className="w-full h-full"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"
              alt=""
            />
          </div>
        </section>

        <section>
          <h1 className="text-3xl font-semibold uppercase mt-20">POKEMON LIST!!!</h1>
          <div className="grid grid-cols-2 lg:grid-cols-5 mt-16 gap-14">
            {!loading ? (
              pokemonList.pokemons?.results?.map((data, index) => (
                <PokemonCard name={data.name} id={data.id} key={data.id} />
              ))
            ) : (
              <h1>LOADING ASW</h1>
            )}
          </div>
        </section>
        <ReactPaginate
          className="flex justify-between mt-14 lg:w-6/12 mx-auto"
          breakLabel="..."
          nextLabel=">"
          onPageChange={loadMore}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </main>
    </>
  );
}

export default HomePage;

