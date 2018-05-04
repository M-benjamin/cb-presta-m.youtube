import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./screens/home";
import VideoScreen from "./screens/video";
import SettingScreen from "./screens/settings";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { CONFIG } from "./constants/index";

// > Set an initilal state
const initial_state = {
  list_region: [],
  region: ""
};

// > my reducer for assign my data
function reducer(prevState = initial_state, action) {
  switch (action.type) {
    case CONFIG.STORAGE.CURRENT_REGION:
      console.log("region in --->", action.payload.region);
      return Object.assign({}, prevState, {
        region: action.payload.region
      });
    default:
      return prevState;
  }
}

const store = createStore(reducer);

console.disableYellowBox = true;
const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Video: {
    screen: VideoScreen
  },
  Setting: {
    screen: SettingScreen
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
