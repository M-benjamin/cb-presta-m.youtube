import React from "react";
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Picker,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import { CONFIG } from "../constants/index";
import { connect } from "react-redux";

class SettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerStyle: { backgroundColor: "#f42627" },
      headerTitle: "Settings"
    };
  };

  constructor() {
    super();
    this.state = {
      listRegions: [],
      region: ""
    };
  }

  componentDidMount() {
    // const { params } = this.props.navigation.state;
    const qp = "&part=snippet&hl=es_MX";
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    fetch(`${BASE_URL}/i18nRegions?key=${API_KEY}${qp}`)
      .then(res => res.json())
      .then(res => {
        // console.log("res is -------->", res);

        const listRegions = [];

        res.items.forEach(v => {
          listRegions.push(v);
        });

        console.log("lenght is", listRegions.length);
        if (listRegions.length != 0) {
          // console.log("region is", listRegions);
          const str = JSON.stringify(listRegions);

          AsyncStorage.setItem(CONFIG.STORAGE.AVAILABLE_REGIONS, str).then(
            () => {
              try {
                // this.setState({ listRegions });
              } catch (error) {}
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  _getData(item) {
    console.log("bla bla bla bla");
    console.log("settings", this.props.region_lang);

    let region = this.props.region_lang;
    region = item;

    console.log("region is", region);
    // console.log(" ------- >", item);
    this.setState({ region: item });

    AsyncStorage.setItem(CONFIG.STORAGE.CURRENT_REGION, region).then(() => {
      try {
        this.props.dispatch({
          type: CONFIG.STORAGE.CURRENT_REGION,
          payload: { region: region }
        });
      } catch (error) {}
    });
  }

  async componentWillMount() {
    await AsyncStorage.getItem(CONFIG.STORAGE.AVAILABLE_REGIONS).then(
      result => {
        // console.log("res is", result);
        if (result) {
          console.log("-----------------------------------");
          let list = JSON.parse(result);
          console.log(list);
          this.setState({ listRegions: list });
        }
      }
    );
  }

  render() {
    return (
      <View>
        <Text>Selected language</Text>

        <Picker
          selectedValue={this.state.region}
          onValueChange={itemValue => this._getData(itemValue)}
        >
          {this.state.listRegions.map((region, index) => (
            <Picker.Item
              key={index}
              label={region.snippet.name}
              value={region.snippet.name}
            />
          ))}
        </Picker>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    region_lang: state.region
  };
}

export default connect(mapStateToProps)(SettingScreen);
