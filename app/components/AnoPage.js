'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  BackAndroid,
  Text,
} from 'react-native';

const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class AnoPage extends Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
  render() {
    return (
      <View style={styles.whole}>
	      <View style={styles.top_container}>
		      <Text>132132</Text>
	      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	whole: {
		width: SCREEN_WIDTH,
		backgroundColor: '#fefefe',
		height: SCREEN_HEIGHT,
	},
	top_container: {
		height: 50,
		padding: 10,
    alignItems: 'center',
		backgroundColor: '#5aa866',
	}
});


export default AnoPage;