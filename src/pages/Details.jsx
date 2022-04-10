import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAILS } from "../graphql/pokemon.js";
import MoveList from "../components/MoveList/MoveList.jsx";

function Details() {
  const { name } = useParams();

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemonName: name,
    },
  });

  return (
    <>
      <main className=" w-10/12 lg:w-8/12 mx-auto">
        <div className="flex flex-col-reverse lg:flex-row mt-20 gap-8">
          <div className="lg:w-4/12">
            <p className="font-semibold">#{!loading && data.pokemon.id} </p>
            {!loading &&
              data.pokemon.types.map((data) => (
                <span className="uppercase mr-2">{data.type.name}</span>
              ))}
            <h1 className=" text-3xl font-semibold">{!loading && data.pokemon.name}</h1>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore illo repellendus
              officia sed ipsa excepturi deserunt laboriosam dolor temporibus tenetur suscipit
              exercitationem nihil corrupti, in aspernatur velit dolores alias numquam.
            </p>

            <div className="mt-8">
              <button className="bg-yellow-400 border-2 w-full lg:w-10/12 border-blue-800 text-blue-800 font-bold py-2 px-10">
                CATCH POKEMON!
              </button>
            </div>
          </div>
          <div className="lg:w-4/12">
            <img
              className="w-full"
              src={`${process.env.REACT_APP_IMAGE_URL}/${!loading && data.pokemon.id}.svg`}
              alt=""
            />
          </div>
          <div className="lg:w-4/12 mx-auto hidden lg:block">
            <div className="">
              <h4 className=" text-lg font-semibold">Type</h4>
              <ul className="flex gap-2 mt-2">
                {!loading &&
                  data.pokemon.types.map((data) => <li className="uppercase">{data.type.name}</li>)}
              </ul>
            </div>
            <div className="mt-8">
              <h4 className=" text-lg font-semibold">Weaknesess</h4>
              <ul className="flex gap-2 mt-2">
                <li className="w-4 h-4 rounded-full bg-red-500"></li>
                <li className="w-4 h-4 rounded-full bg-blue-500"></li>
                <li className="w-4 h-4 rounded-full bg-green-500"></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mt-8">
            <h4 className=" text-lg font-semibold">Move List</h4>
            {!loading && <MoveList moveList={data.pokemon.moves} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Details;

