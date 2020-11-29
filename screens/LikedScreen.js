import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PokemonCard from "../components/PokemonCard";
import * as pokemonActions from "./../store/actions/pokemon";

const LikedScreen = (props) => {
  const dispatch = useDispatch();
  const likedPokemons = useSelector((state) => state.pokemons.likedPokemons);
  const [isLoading, setIsLoading] = useState(true);

  const toggleLikeHandler = async (pokemon, pokemonNum) => {
    try {
      await dispatch(pokemonActions.toggleLikePokemon(pokemon, pokemonNum));
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        await dispatch(pokemonActions.fetchSavedPokemons());
      } catch (error) {
        throw error;
      }
      setIsLoading(false);
    };
    fetchPokemons();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.list}
        data={Object.entries(likedPokemons)}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            onToggle={() => {
              toggleLikeHandler(item[1], parseInt(item[0]));
            }}
            onSelect={() =>
              props.navigation.navigate("Pokemon", {
                pokemon: item[1],
              })
            }
            id={parseInt(item[0])}
            isSave={!!likedPokemons[item[0]]}
          />
        )}
      />
    </View>
  );
};

LikedScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Favourites",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 5,
  },
  list: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default LikedScreen;
