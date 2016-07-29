'use strict';

import React, {Component} from 'react';

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
										<View style={styles.testStyle}>
												<Text style={styles.textStyle}>AnoPage</Text>
										</View>
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
				justifyContent: 'center',
				backgroundColor: '#5a38b6',
		},
		testStyle: {
				alignItems: 'center',
				// fontSize: 30,
		},
		textStyle: {
				backgroundColor: '#000000',
				fontSize: 30,
				color: '#ffffff',
		}
});

export default AnoPage;