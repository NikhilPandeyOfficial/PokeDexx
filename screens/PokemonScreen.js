import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const PokemonScreen = (props) => {
  const { url } = props.navigation.getParam("pokemon");
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}`);
        const data = await response.json();

        await setPokemon(data);
      } catch (error) {
        throw error;
      }
      setIsLoading(false);
    };
    getPokemon();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const { name, id, height, weight, types, base_experience, moves } = pokemon;

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          }}
          style={styles.image}
        />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.listStyle}
      >
        <View style={styles.itemContainer}>
          <View style={styles.keyContainer}>
            <Text style={styles.keyText}>Name</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.keyText}>{`${name}`}</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.keyContainer}>
            <Text style={styles.keyText}>Base Experience</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.keyText}>{`${base_experience}`}</Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.keyContainer}>
            <Text style={styles.keyText}>Height</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.keyText}>{`${height}`}</Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.keyContainer}>
            <Text style={styles.keyText}>Weight</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.keyText}>{`${weight}`}</Text>
          </View>
        </View>

        {!!moves && (
          <View style={styles.itemContainer}>
            <View style={styles.keyContainer}>
              <Text style={styles.keyText}>Moves</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.keyText}>{`${moves[0].move.name}`}</Text>
            </View>
          </View>
        )}

        {!!moves &&
          moves.slice(1).map((move) => (
            <View style={styles.itemContainer}>
              <View style={styles.keyContainer}></View>
              <View style={styles.valueContainer}>
                <Text style={styles.keyText}>{`${move.move.name}`}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

PokemonScreen.navigationOptions = (navData) => {
  const pokemonName = navData.navigation.getParam("pokemon")["name"];
  return {
    headerTitle: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
  };
};

const styles = StyleSheet.create({
  Screen: {
    height: "100%",
  },
  imageContainer: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: "100%",
    maxHeight: 250,
    width: "100%",
    maxWidth: 250,
  },
  itemContainer: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  keyContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  keyText: {
    fontSize: 18,
  },
  valueContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  innerList: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PokemonScreen;
