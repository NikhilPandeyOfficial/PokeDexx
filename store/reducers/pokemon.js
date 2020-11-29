import {
  FETCH_POKEMONS,
  FETCH_SAVED_POKEMONS,
  UNSAVE_POKEMON,
  SAVE_POKEMON,
} from "../actions/pokemon";

const initialState = {
  allPokemons: {},
  likedPokemons: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS:
      return {
        ...state,
        allPokemons: action.pokemons,
      };

    case SAVE_POKEMON:
      return {
        ...state,
        likedPokemons: action.pokemons,
      };

    case FETCH_SAVED_POKEMONS:
      return {
        ...state,
        likedPokemons: action.pokemons,
      };
    default:
      return initialState;
  }
};
