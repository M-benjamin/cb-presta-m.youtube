import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ScrollView,
  Image,
  Button
} from "react-native";
import { StackNavigator } from "react-navigation";
import { CONFIG } from "../constants/index";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      /* Your custom header */
      headerStyle: { backgroundColor: "#f42627" },
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flex: 1, paddingRight: 10 }}
            onPress={() => {
              // this._add;
              /* 1. Navigate to the Details route with params */
              navigation.navigate("Setting", {
                // url: item.id.videoId
              });
            }}
            title="Info"
            color="#fff"
          >
            <Image
              style={{
                width: 20,
                height: 20
              }}
              source={require("../assets/icons/settings.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => alert("This is a button!")}
            title="Info"
            color="#fff"
          >
            <Image
              style={{
                width: 20,
                height: 20
              }}
              source={require("../assets/icons/love.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, paddingLeft: 10 }}
            onPress={() => alert("This is a button!")}
            title="Info"
            color="#fff"
          >
            <Image
              style={{
                width: 20,
                height: 20
              }}
              source={require("../assets/icons/user.png")}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: (
        <TouchableOpacity
          style={{ flex: 1, marginLeft: 15 }}
          onPress={() => alert("This is a button!")}
          title="Info"
          color="#fff"
        >
          <Image
            style={{
              width: 50,
              height: 50
            }}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
      )
    };
  };
  constructor() {
    super();
    this.state = {
      video: [],
      current: "FR"
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // Store prevUserId in state so we can compare when props change.
  //   // Clear out any previously-loaded user data (so we don't render stale stuff).

  //   // console.log("My new region is", this.state.current);
  //   // if (this.props.region !== prevState.prevUserId) {
  //   //   return {
  //   //     prevUserId: nextProps.userId,
  //   //     profileOrError: null
  //   //   };
  //   // }
  //   // No state update necessary
  //   return null;
  // }

  async componentDidUpdate(prevProps, prevState) {
    // if (prevState.profileOrError === null) {
    //   // At this point, we're in the "commit" phase, so it's safe to load the new data.
    //   this._loadUserData();
    // }
    console.log("pppppp pppp oooo ", this.props.region);
    console.log("p hhh  jjjj h hh h h ", this.state.current);

    if (this.state.current !== this.props.region) {
      console.log("p oooo ooo o oo o", this.props.region);
      let r = this.props.region;
      this.props.dispatch({
        type: CONFIG.STORAGE.CURRENT_REGION,
        payload: { region: r }
      });
    }
    // this._fechData();
  }

  componentDidMount() {
    let r = this.props.region;
    this.props.dispatch({
      type: CONFIG.STORAGE.CURRENT_REGION,
      payload: { region: r }
    });

    this._fechData(this.props.region);
    // await AsyncStorage.getItem(CONFIG.STORAGE.CURRENT_REGION).then(result => {
    //   console.log("res is", result);
    //   if (result) {
    //     console.log("-----------------------------------");
    //     // let list = JSON.parse(result);
    //     // console.log(list);
    //     this.setState({ current: result });
    //   }
    // });
  }

  _fechData(reg) {
    const qp = "&part=snippet,id&order=rating&maxResults=20";
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;

    console.log("R is D --->", reg);

    fetch(`${BASE_URL}/search?key=${API_KEY}${qp}&regioncode=${reg}`)
      .then(res => res.json())
      .then(res => {
        // console.log("res is -------->", res);

        const video = [];

        res.items.forEach(v => {
          video.push(v);
        });

        // console.log("video is", video);
        this.setState({ video });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log("my data is ", this.state.video);

    const liste = this.state.video.map((item, id) => {
      // const token = new TOTP(item.war, 5).generate();
      // console.log(item.snippet.channelTitle);

      return (
        <View key={id}>
          <TouchableOpacity
            onPress={() => {
              // this._add;
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate("Video", {
                url: item.id.videoId
              });
            }}
          >
            <Text style={styles.title}>{item.snippet.channelTitle}</Text>
            <Image
              style={{
                width: 350,
                height: 150
              }}
              source={{
                uri: item.snippet.thumbnails.default.url
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <Text style={styles.Title}>Trend in France</Text>
        <ScrollView>{liste}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  btnAdd: {
    backgroundColor: "#608fdb",
    width: 300,
    height: 50,
    marginTop: 20
  },
  btnClear: {
    backgroundColor: "#ed3131",
    marginTop: 10,
    width: 300,
    height: 50
  },
  textAdd: {
    textAlign: "center",
    marginTop: 15,
    color: "#fff"
  },
  textClear: {
    textAlign: "center",
    marginTop: 15,
    color: "#fff"
  },
  title: {
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#f42627",
    marginTop: 10,
    padding: 10,
    fontSize: 20
  },
  Title: {
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#000",
    paddingLeft: 100,
    paddingTop: 15,
    width: 400,
    fontSize: 20,
    margin: 0,
    height: 50
  }
});

function mapStateToProps(state) {
  return {
    region: state.region
  };
}

export default connect(mapStateToProps)(HomeScreen);
