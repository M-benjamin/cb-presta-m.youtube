import React from "react";
import { StyleSheet, Text, View, WebView } from "react-native";
import { StackNavigator } from "react-navigation";

export default class VideoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: "AUTHENTIFICATOR",
      headerStyle: { backgroundColor: "#f42627" }
    };
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <WebView
        source={{
          uri: `https://www.youtube.com/watch?v=${params.url}`
        }}
      />
    );
  }
}
