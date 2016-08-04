'use strict'

import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ToastAndroid,
	ScrollView,
	TouchableOpacity
} from 'react-native';
const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

const values = require('../../widgets/values');
import AddNote from './AddNote';
class NoteDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			detail: {}
		};
	}

	componentDidMount() {
		this.setState({
			id: this.state.id = this.props.id,
		});
		this._loadDetail();
	}

	_loadDetail() {
		return fetch(
			'http://192.168.1.57:9017/api/detail/?id=' + this.state.id,
			{method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					detail: this.state.detail = responseJson.body
				})
			})
			.catch((err) => {
				ToastAndroid.show('res-err!' + err.toString(), ToastAndroid.SHORT)
			})
			.done();
	}

	_toDetail() {
		const {navigator} = this.props;
		if (navigator) {
			navigator.replace({
				name: 'AddNote',
				component: AddNote,
				params:{
					load: true,
					id: this.state.id
				}
			})
		}
	}

	_back() {
		const {navigator} = this.props;
		if (navigator) {
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
					<Text style={style.topTitleText}>笔记详情</Text>
					<View style={style.flexContentRight}>
						<TouchableOpacity style={style.topButtonContainer} onPress={this._toDetail.bind(this)}>
							<Text style={style.topButtonAddNew}>编辑</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={style.scrollStyle}>
					<ScrollView>
						<View style={{
							flexWrap: 'wrap',
							marginBottom: 10,
							backgroundColor: values.TITLE_COLOR_ANOTHER_TWO,
							padding: 15,
						}}>
							<Text style={{
								fontSize: 20,
								color: values.TITLE_TEXT_COLOR,
							}}>标题：《{ this.state.detail.title }》</Text>
							<Text style={{
								fontSize: 14,
								lineHeight: 20,
								marginTop: 3,
								color: values.TITLE_TEXT_COLOR,
								alignSelf: 'flex-end',
							}}>最近操作时间：{ this.state.detail.date }</Text>
						</View>
						<View style={{flex: 1, paddingLeft: 15, paddingRight: 15,}}>
							<Text style={style.mainContent}>{ this.state.detail.content }</Text>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	topTitleBar: {
		width: SCREEN_WIDTH,
		height: 50,
		backgroundColor: values.TITLE_COLOR,
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
		color: values.TITLE_TEXT_COLOR,
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
		color: values.TITLE_SIDE_BUTTON,
	},
	scrollStyle: {
		flex: 1,
		flexDirection: 'column',
	},
	mainContent: {
		fontSize: 15,
		lineHeight: 20,
		color: values.TITLE_COLOR_ANOTHER,
	}
});

export default NoteDetail;