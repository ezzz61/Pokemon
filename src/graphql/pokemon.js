import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($pokemonName: String!) {
    pokemon(name: $pokemonName) {
      id
      name
      base_experience
      moves {
        move {
          url
          name
        }
      }
      types {
        type {
          name
        }
      }
      abilities {
        ability {
          id
          name
        }
      }
    }
  }
`;

const pokemon = {
  GET_POKEMONS,
  GET_POKEMON_DETAILS,
};

export default pokemon;

