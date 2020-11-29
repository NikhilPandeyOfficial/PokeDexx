import { AsyncStorage } from "react-native";

export const FETCH_POKEMONS = "FETCH_POKEMONS";
export const FETCH_SAVED_POKEMONS = "FETCH_SAVED_POKEMONS";
export const UNSAVE_POKEMON = "UNSAVE_POKEMON";
export const SAVE_POKEMON = "SAVE_POKEMON";

export const fetchPokemons = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const responseData = await response.json();

      const { results } = responseData;

      let Pokemons = {};
      let i = 0;
      for (let pokemon of results) {
        Pokemons[i] = pokemon;
        i++;
      }

      dispatch({
        type: FETCH_POKEMONS,
        pokemons: Pokemons,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const toggleLikePokemon = (pokemon, pokemonNum) => {
  return async (dispatch, getState) => {
    try {
      const oldLikedPokemons = await AsyncStorage.getItem("LikedPokemons");
      const parsedOldLikedPokemons = JSON.parse(oldLikedPokemons);

      let curLikedPokemons = {
        ...parsedOldLikedPokemons,
      };

      if (!curLikedPokemons[pokemonNum]) {
        curLikedPokemons[pokemonNum] = pokemon;
      } else {
        delete curLikedPokemons[pokemonNum];
      }
      await AsyncStorage.setItem(
        "LikedPokemons",
        JSON.stringify(curLikedPokemons)
      );

      dispatch({
        type: SAVE_POKEMON,
        pokemons: curLikedPokemons,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchSavedPokemons = () => {
  return async (dispatch, getState) => {
    try {
      const likedPokemons = await AsyncStorage.getItem("LikedPokemons");
      const parsedLikedPokemons = JSON.parse(likedPokemons);

      dispatch({
        type: FETCH_SAVED_POKEMONS,
        pokemons: parsedLikedPokemons,
      });
    } catch (error) {
      throw error;
    }
  };
};
