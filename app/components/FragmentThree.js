'use strict'

import React, { Component } from 'react';
import {
	Navigator,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

class ThirdPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	_back() {
		let { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		}
	}
	render() {
		return (
			<View style={ style.whole }>
			
			</View>
		);
	}
}

const style = StyleSheet.create({
	whole: {
		width: SCREEN_WIDTH,
	}
});

export default ThirdPage;