import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeScreen from "./../screens/HomeScreen";
import LikedScreen from "./../screens/LikedScreen";
import PokemonScreen from "./../screens/PokemonScreen";
import UserScreen from "./../screens/UserScreen";

const defaultStackNavOptions = {
  headerTitleStyle: {
    fontSize: 22,
  },
};

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Pokemon: PokemonScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const LikedNavigator = createStackNavigator(
  {
    Liked: LikedScreen,
    Pokemon: PokemonScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const UserNavigator = createStackNavigator(
  {
    User: UserScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <AntDesign
              name="home"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );
        },
      },
    },
    Liked: {
      screen: LikedNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <AntDesign
              name="hearto"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );
        },
      },
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <AntDesign
              name="user"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );
        },
      },
    },
  },
  {
    animationEnabled: true,
    tabBarPosition: "top",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#000000",
      style: {
        height: 50,
        backgroundColor: "white",
      },
    },
  }
);

const MainNavigator = createSwitchNavigator({
  App: TabNavigator,
});

export default createAppContainer(MainNavigator);
