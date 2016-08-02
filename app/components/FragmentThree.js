'use strict'

import React, {Component} from 'react';
import {
	Navigator,
	View,
	ListView,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import AddNote from './views/AddNote';

const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
class ThirdPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={style.topTitleBar}>
					<View style={style.flexContent}></View>
					<Text style={style.topTitleText}>记事本</Text>
					<View style={style.flexContent}>
						<TouchableOpacity style={style.topButtonContainer} onPress={this._jump.bind(this)}>
							<Text style={style.topButtonAddNew}>新增</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
	_jump() {
		const { navigator } = this.props;
		//为什么这里可以取得 props.navigator?请看上文:
		//<Component {...route.params} navigator={navigator} />
		//这里传递了navigator作为props
		if(navigator) {
			navigator.push({
				name: 'AddNote',
				component: AddNote,
			})
		}
	}
}

const style = StyleSheet.create({
	topTitleBar: {
		width: SCREEN_WIDTH,
		height: 50,
		backgroundColor: '#ffaa99',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	flexContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	topTitleText: {
		fontSize: 25,
		color: '#666666',
	},
	topButtonContainer: {
		width: 60,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	topButtonAddNew: {
		fontSize: 18,
		textAlign: 'right',
		color: '#65ddc5',
	}
});

export default ThirdPage;