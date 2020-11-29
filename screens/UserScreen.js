import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  Alert,
  Button,
  SafeAreaView,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Cbtn from "./../components/Cbtn";

const UserScreen = (props) => {
  const [error, setError] = useState("");

  const defaultHandler = () => {
    Alert.alert(
      "News Application Says..",
      "We're Still working on this feature. Come back later!",
      [{ text: "Okay" }]
    );
  };

  return (
    <LinearGradient
      colors={["#00416A", "#FFFFFF"]}
      style={{ ...styles.screen }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
          }}
          style={styles.image}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Anonymous User</Text>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Cbtn
          text="Update Details"
          icon="account-edit"
          onPress={defaultHandler}
        />
        <Cbtn
          text="Change Password"
          icon="textbox-password"
          onPress={defaultHandler}
        />
        <Cbtn text="Developer Info" icon="worker" onPress={defaultHandler} />

        <Cbtn text="Sign Out" style={styles.signout} onPress={defaultHandler} />
      </View>
    </LinearGradient>
  );
};

UserScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Account",
  };
};

const styles = StyleSheet.create({
  signout: {
    color: "red",
  },
  screen: {
    paddingTop: 10,
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100,
  },
  nameContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    padding: 10,
  },
  profileContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 25,
    width: "100%",
    height: "60%",
  },
});

export default UserScreen;
