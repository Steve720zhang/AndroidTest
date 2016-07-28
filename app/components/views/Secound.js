'use strict';

import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Platform,
	TouchableOpacity,
	BackAndroid,
	Text
} from 'react-native';

const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

class TwoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View style={styles.whole}>
				<View style={styles.top_container}>
					<View style={styles.backIcon}></View>
					<View style={styles.testStyle}>
						<Text>SecoundPage</Text>
					</View>
				</View>
				<View></View>
				<View style={styles.bottomStyle}>
					<View style={styles.bottomUp}>
						<Text>{SCREEN_WIDTH}
						</Text>
					</View>
					<View style={styles.bottomDown}></View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	whole: {
		width: SCREEN_WIDTH,
		flex: 1,
		backgroundColor: '#fefefe',
	},
	backIcon: {
		width: 20,
		alignSelf: 'center',
		margin: 20,
		height: 20,
		backgroundColor: '#000000',
	},
	top_container: {
		height: 50,
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#aa5866',
	},
	testStyle: {
		alignItems: 'center',
		// fontSize: 30,
		backgroundColor: '#20000000',
	},
	bottomStyle: {
		flex: 1,
		backgroundColor: '#ffaaaa',
	},
	bottomUp: {
		flex: 1,
		margin: 10,
		backgroundColor: '#aaffaa',
	},
	bottomDown: {
		flex: 2,
		margin: 10,
		marginTop: 0,
		backgroundColor: '#aaaaff',
	}
});

export default TwoPage;