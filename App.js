import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapApp from './MapApp.js';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

let pwidth = Dimensions.get('window').width;
let pheight = Dimensions.get('window').height;

export default class App extends Component {
  state = {
    lat: 10, // dummy value
    long: 10, // dummy value
    isloggedin: false,
  };

  LogIn = () => {
    this.setState({
      isloggedin: true,
    });
  };

  Back = () => {
    this.setState({
      isloggedin: false,
    });
  };

  SetCoords = () => {
    this.setState({
      lat: 37.344037,
      long: 126.953703,
    });
  };

  GetPosition = () => {
    Geolocation.getCurrentPosition((res) => {
      this.setState({
        lat: res.coords.latitude,
        long: res.coords.longitude,
      });
      console.log(this.state.lat, this.state.long);
    });
  };

  componentDidMount() {
    this.GetPosition();
  }

  render() {
    const {isloggedin, lat, long} = this.state;
    return (
      <View style={styles.main}>
        {isloggedin ? (
          <View style={styles.main}>
            <MapApp style={styles.main} lat={lat} long={long} />
            <TouchableOpacity style={styles.back} onPress={this.Back}>
              <Text style={styles.logintxt}>back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.button}>
              <TouchableOpacity style={styles.login} onPress={this.LogIn}>
                <Text style={styles.logintxt}>Log in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.setcoords}
                onPress={this.GetPosition}>
                <Text style={styles.logintxt}>get coords</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.setcoords}
                onPress={this.SetCoords}>
                <Text style={styles.logintxt}>set coords</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <StatusBar hidden={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    width: pwidth,
    height: pheight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  login: {
    backgroundColor: '#aaaaff88',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    position: 'absolute',
    marginTop: 80,
    right: 10,
    backgroundColor: '#ffffffaa',
    width: 80,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setcoords: {
    backgroundColor: '#f1f1f1aa',
    width: 110,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logintxt: {
    fontSize: 20,
    fontWeight: '700',
  },
});
