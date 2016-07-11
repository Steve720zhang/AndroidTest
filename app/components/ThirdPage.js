'use strict'

import React, { Component } from 'react';
import {
	Navigator,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

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
			<View>
			<Text>
				ThirdPage!
			</Text>
			<TouchableOpacity onPress={this._back.bind(this)}>
			<Text>_backSecond!</Text>
			</TouchableOpacity>
			</View>
		);
	}
}

export default ThirdPage;