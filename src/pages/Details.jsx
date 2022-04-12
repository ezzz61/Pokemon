import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAILS } from "../graphql/pokemon.js";
import MoveList from "../components/MoveList/MoveList.jsx";
import pokeball from "../assets/pokeball.svg";
import Rodal from "rodal";
import { v4 as uuidv4 } from "uuid";
import "rodal/lib/rodal.css";

function Details() {
  const { name } = useParams();
  const [nickname, setNickname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [alerModal, setAlerModal] = useState(false);
  const [catchStatus, setCatchStatus] = useState(null);
  const catchWord = "Catching...";
  const splitParagaph = catchWord.split("");
  const currentPokemonList = localStorage.getItem("pokemons");

  const {
    loading,
    error,
    data: details,
  } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemonName: name,
    },
  });

  const closeModal = () => {
    setShowModal(false);
  };

  const catchRate = () => {
    const randomNumb = Math.random();
    const getCatchResult = randomNumb < 0.5 ? false : true;
    getCatchResult ? setCatchStatus(true) : setShowFailedModal(true);
  };

  const checkPokemonNickname = (type, name) => {
    const currentPokemons = JSON.parse(currentPokemonList);

    if (currentPokemons) {
      const result = currentPokemons.find((data) => data.type === type && data.nickname === name);
      if (result) {
        setAlerModal(true);
        return true;
      }
    }
  };

  const addToMyList = (e) => {
    if (nickname.length < 2) return alert("Hei name must be > then 2");

    e.preventDefault();
    let payload = { ...details.pokemon, nickname: nickname, identifier: uuidv4() };

    const isPokemonWithNickExist = checkPokemonNickname(details.name, nickname);
    if (isPokemonWithNickExist) return;

    if (currentPokemonList) {
      let currentData = [...JSON.parse(currentPokemonList)];
      currentData.push(payload);
      localStorage.setItem("pokemons", JSON.stringify(currentData));
      setCatchStatus(false);
    } else {
      let createNewList = [payload];
      localStorage.setItem("pokemons", JSON.stringify(createNewList));
      setCatchStatus(false);
    }

    // reset input
    setNickname("");
  };

  const catchPokemon = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      catchRate();
    }, 3000);
  };

  if (error) {
    return error;
  }

  return (
    <>
      {/* failed Modal */}
      <Rodal
        height={300}
        visible={showFailedModal}
        onClose={() => {
          setShowFailedModal(false);
        }}
        closeMaskOnClick={false}
      >
        <div className="w-full h-full">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h1 className=" text-2xl font-semibold">Oooppsiee!</h1>
            <img className="h-16 mt-4 animate-pulse" src={pokeball} alt="pokeball icon" />
            <div className="h-10 flex flex-col gap-4 mt-5">
              <p>Pokemon Run Awayy</p>
              <div className="bg-yellow-500 mt-2">
                <button
                  onClick={() => {
                    setShowFailedModal(false);
                  }}
                  className=" bg-yellow-400 w-full h-full py-1 px-3 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
                >
                  Okay :(
                </button>
              </div>
            </div>
          </div>
        </div>
      </Rodal>
      {/* success Modal */}
      <Rodal
        height={300}
        visible={catchStatus}
        showCloseButton={false}
        onClose={() => {
          setCatchStatus(false);
        }}
        closeMaskOnClick={false}
      >
        <div className="w-full h-full">
          <div className="flex flex-col items-center gap-2 mt-2">
            <h1 className=" text-2xl font-semibold">GHOTCHA!</h1>
            <img className="h-16 mt-4 animate-spin" src={pokeball} alt="pokeball icon" />
            <div className="h-10 flex flex-col gap-2 mt-5">
              <input
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                name="name"
                maxLength="50"
                placeholder="Pokemon name"
                className=" border-b border-black outline-none pb-1"
                type="text"
              />
              <div className="bg-yellow-500 mt-4">
                <button
                  onClick={addToMyList}
                  className=" bg-yellow-400 w-full h-full py-1 px-3 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
                >
                  SUBMIT
                </button>
              </div>
              <button
                onClick={() => {
                  setCatchStatus(false);
                }}
                className="text-gray-400 uppercase text-sm"
              >
                release
              </button>
            </div>
          </div>
        </div>
      </Rodal>
      {/* Cacthing Modal */}
      <Rodal
        visible={showModal}
        onClose={closeModal}
        closeMaskOnClick={false}
        showCloseButton={false}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img className="h-20 animate-bounce" src={pokeball} alt="pokeball icon" />
          <div className="flex gap-2 mt-8">
            {splitParagaph.map((data, index) => (
              <p className="animate-bounce font-semibold" key={index}>
                {data}
              </p>
            ))}
          </div>
        </div>
      </Rodal>
      {/* nickname failed alert Modal */}
      <Rodal
        height={250}
        visible={alerModal}
        onClose={() => {
          setAlerModal(false);
        }}
        closeMaskOnClick={false}
      >
        <div className="w-full h-full">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h1 className=" text-2xl font-semibold">HEYY!</h1>
            <div className="h-10 flex flex-col gap-4 mt-5">
              <p className=" text-center">
                Pokemon with this nickname already exist! <br /> Try give another nickname
              </p>
              <div className="bg-yellow-500 mt-2">
                <button
                  onClick={() => {
                    setAlerModal(false);
                  }}
                  className=" bg-yellow-400 w-full h-full py-1 px-3 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
                >
                  Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      </Rodal>

      <main className="w-10/12 lg:w-8/12 mx-auto max-w-5xl">
        <div className="flex flex-col-reverse justify-between lg:flex-row mt-20 gap-8">
          <div className="lg:w-4/12 flex items-center">
            <div className="">
              <p className="font-semibold">#{!loading && details.pokemon.id} </p>
              {!loading &&
                details.pokemon.types.map((data) => (
                  <span key={data.type.name} className="uppercase mr-2">
                    {data.type.name}
                  </span>
                ))}
              <h1 className=" text-3xl font-semibold">{!loading && details.pokemon.name}</h1>
              <p className="mt-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore illo repellendus
                officia sed ipsa excepturi deserunt laboriosam dolor temporibus tenetur suscipit
                exercitationem nihil corrupti, in aspernatur velit dolores alias numquam.
              </p>

              <div className="bg-yellow-500 mt-6">
                <button
                  onClick={catchPokemon}
                  className=" bg-yellow-400 w-full h-full py-1.5 text-gray-900 font-semibold translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 transition-all"
                >
                  Catch!
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-5/12">
            <img
              className="w-full"
              src={`${process.env.REACT_APP_IMAGE_URL}/${!loading && details.pokemon.id}.svg`}
              alt="pokemon"
            />
          </div>
        </div>
        <div className="">
          <div className="mt-8">
            <h4 className=" text-lg font-semibold">Move List</h4>
            {!loading && <MoveList moveList={details.pokemon.moves} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Details;

