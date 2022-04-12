import React, { useState } from "react";
import Rodal from "rodal";

function PokemonCard({ id, name, identifier, refetchPokemons }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const getCurrentPokemons = JSON.parse(localStorage.getItem("pokemons"));

  const releasePokemon = () => {
    const restPokemons = getCurrentPokemons.filter((data) => data.identifier !== identifier);
    localStorage.setItem("pokemons", JSON.stringify(restPokemons));

    refetchPokemons();
  };

  return (
    <>
      {/* details modal */}
      <Rodal
        height={450}
        visible={showDetails}
        onClose={() => {
          setShowDetails(false);
        }}
        closeMaskOnClick={false}
      >
        <div className="w-full h-full">
          <div className="flex flex-col items-center gap-2 mt-8">
            <img
              className=" h-32 mt-4 animate-bounce"
              alt={name}
              src={`${process.env.REACT_APP_IMAGE_URL}/${id}.svg`}
            />
            <p>Nicname :</p>
            <h1 className=" text-lg font-semibold">{name}</h1>
            <div className="h-10 flex flex-col gap-4 mt-5">
              <p>Pokemon Run Awayy</p>
              <div className="bg-yellow-500 mt-2">
                <button
                  onClick={() => {
                    setShowDetails(false);
                  }}
                  className=" bg-yellow-400 w-full h-full py-1 px-3 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
                >
                  Close
                </button>
              </div>

              <button
                onClick={() => {
                  setShowConfirmation(true);
                }}
                className="text-gray-600"
              >
                Release
              </button>
            </div>
          </div>
        </div>
      </Rodal>
      {/* release confirmation modal */}
      <Rodal
        height={200}
        visible={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
        }}
        closeMaskOnClick={false}
      >
        <div className="w-full h-full">
          <div className="flex flex-col items-center gap-2 mt-8">
            <div className="h-10 flex flex-col gap-4 mt-5">
              <p>Are you sure to release this pokemon ?</p>
              <div className="bg-yellow-500 mt-2">
                <button
                  onClick={releasePokemon}
                  className=" bg-yellow-400 w-full h-full py-1 px-3 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
                >
                  Release
                </button>
              </div>

              <button
                onClick={() => {
                  setShowConfirmation(false);
                }}
                className="text-gray-600"
              >
                No!
              </button>
            </div>
          </div>
        </div>
      </Rodal>

      <div
        onClick={() => {
          setShowDetails(true);
        }}
        className=""
      >
        <div className="relative">
          <img
            className="w-full h-36"
            src={`${process.env.REACT_APP_IMAGE_URL}/${id}.svg`}
            alt={name}
          />
        </div>
        <div className="mt-6">
          <h1 className="text-center font-semibold">{name}</h1>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;

