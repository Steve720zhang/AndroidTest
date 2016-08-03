'use strict'

import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

class AddNote extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	_back() {
		const { navigator } = this.props;
		//为什么这里可以取得 props.navigator?请看上文:
		//<Component {...route.params} navigator={navigator} />
		//这里传递了navigator作为props
		if(navigator) {
			navigator.pop();
		}
	}
	render() {
		return (
			<View style={{flex: 1}}>
				<View style={style.topTitleBar}>
					<View style={style.flexContentLeft}>
						<TouchableOpacity style={style.topButtonContainer} onPress={this._back.bind(this)}>
							<Text style={style.topButtonAddNew}>后退</Text>
						</TouchableOpacity>
					</View>
					<Text style={style.topTitleText}>新建笔记</Text>
					<View style={style.flexContentRight}>
						<TouchableOpacity style={style.topButtonContainer}>
							<Text style={style.topButtonAddNew}>保存</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
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
	flexContentRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	flexContentLeft: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
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

export default AddNote;