import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PokemonCard = (props) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        props.onSelect();
      }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://pokeres.bastionbot.org/images/pokemon/${
                props.id + 1
              }.png`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.likeContainer}>
          <AntDesign
            name={props.isSave ? "heart" : "hearto"}
            size={30}
            color="black"
            onPress={props.onToggle}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    height: "100%",
    borderRadius: 15,
    marginVertical: 15,
    marginLeft: 12,
    padding: 10,
    maxHeight: 300,
    elevation: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    height: "60%",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  likeContainer: {
    maxHeight: 50,
  },
});

export default PokemonCard;
