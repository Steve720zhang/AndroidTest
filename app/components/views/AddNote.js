'use strict'

import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	StyleSheet,
	ToastAndroid,
	TouchableOpacity
} from 'react-native';

const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

const values = require('../../widgets/values');

class AddNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			load: false,
			detail: {}
		};
	}

	componentDidMount() {
		this.setState({
			id: this.state.id = this.props.id,
			load: this.state.load = this.props.load,
		});
		if (this.state.load) {
			this._loadDetail();
		}
	}

	_loadDetail() {
		return fetch(
			'http://192.168.1.57:9017/api/detail/?id=' + this.state.id,
			{method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					detail: {
						title: this.state.title = responseJson.body.title,
						content: this.state.content = responseJson.body.content,
					}
				})
			})
			.catch((err) => {
				ToastAndroid.show('res-err!' + err.toString(), ToastAndroid.SHORT)
			})
			.done();
	}

	_back() {
		const {navigator} = this.props;
		if (navigator) {
			navigator.pop();
		}
	}

	render() {
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<View style={style.topTitleBar}>
					<View style={style.flexContentLeft}>
						<TouchableOpacity style={style.topButtonContainer} onPress={this._back.bind(this)}>
							<Text style={style.topButtonAddNew}>后退</Text>
						</TouchableOpacity>
					</View>
					<Text style={style.topTitleText}>{this.state.load ? '编辑笔记' : '新建笔记'}</Text>
					<View style={style.flexContentRight}>
						<TouchableOpacity style={style.topButtonContainer}
						                  onPress={this.state.load ? () => this._save() : () => this._add()}>
							<Text style={style.topButtonAddNew}>保存</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{flex: 1, flexDirection: 'column', paddingBottom: 10,}}>
					<TextInput editable={true} autoFocus={true}
					           placeholderTextColor={values.TITLE_COLOR} underlineColorAndroid={'transparent'}
					           autoCapitalize={'none'}
					           style={{fontSize: 20, flex: 1, textAlignVertical: 'top', color: values.TITLE_COLOR_ANOTHER_TWO,}}
					           multiline={true} placeholder='请编辑标题' value={this.state.title} onChangeText={(text) => {
						var titleTXT = text;
						this.setState({
							title: this.state.title = titleTXT,
						})
					}}/>
					<View style={{height: 1, backgroundColor: values.TITLE_COLOR_ANOTHER_TWO,}}/>
					<TextInput editable={true}
					           placeholderTextColor={values.TITLE_COLOR} underlineColorAndroid={'transparent'}
					           autoCapitalize={'none'}
					           style={{fontSize: 14, flex: 8, textAlignVertical: 'top', color: values.TITLE_COLOR_ANOTHER_TWO,}}
					           multiline={true} placeholder='请编辑正文内容' value={this.state.content} onChangeText={(text) => {
						var contentTXT = text;
						this.setState({
							content: this.state.content = contentTXT,
						})
					}}/>
				</View>
			</View>
		);
	}

	_add() {
		if (!this.state.title || !(this.state.title.toString().length > 0)) {
			ToastAndroid.show('请输入标题', ToastAndroid.SHORT)
			return;
		}
		if (!this.state.content || !(this.state.content.toString().length > 0)) {
			ToastAndroid.show('请输入内容', ToastAndroid.SHORT)
			return;
		}
		ToastAndroid.show('title: ' + this.state.title + '\ncontent:' + this.state.content, ToastAndroid.SHORT)
		return fetch('http://192.168.1.57:9017/api/insert/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: 'title=' + this.state.title + '&content=' + this.state.content
			})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.rr === 1) {
					ToastAndroid.show('添加成功！r:' + responseJson.rr, ToastAndroid.SHORT)
					return this._back();
				} else {
					ToastAndroid.show('添加失败！', ToastAndroid.SHORT)
				}
			})
			.catch((err) => {
				ToastAndroid.show('res-err!' + err.toString(), ToastAndroid.SHORT)
			})
			.done();
	}

	_save() {
		if (!this.state.title || !(this.state.title.toString().length > 0)) {
			ToastAndroid.show('标题不能为空', ToastAndroid.SHORT)
			return;
		}
		if (!this.state.content || !(this.state.content.toString().length > 0)) {
			ToastAndroid.show('内容不能为空', ToastAndroid.SHORT)
			return;
		}
		return fetch('http://192.168.1.57:9017/api/change/?id=' + this.state.id,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: 'title=' + this.state.title + '&content=' + this.state.content
			})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.rr === 1) {
					ToastAndroid.show('编辑成功!', ToastAndroid.SHORT)
					return this._back();
				} else {
					ToastAndroid.show('编辑失败！', ToastAndroid.SHORT)
				}
			})
			.catch((err) => {
				ToastAndroid.show('res-err!' + err.toString(), ToastAndroid.SHORT)
			})
			.done();
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
});

export default AddNote;