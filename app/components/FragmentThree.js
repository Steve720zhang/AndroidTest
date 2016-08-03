'use strict'

import React, {Component} from 'react';
import {
	Navigator,
	View,
	ListView,
	ToastAndroid,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import AddNote from './views/AddNote';
import NoteDetail from './views/NoteDetail';

var pageSize = 10;
var pageNow = 1;

const values = require('../widgets/values');

const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
class ThirdPage extends Component {

	constructor(props) {
		var listData = [];

		super(props);
		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			listData: listData = [],
			dataSource: ds.cloneWithRows(listData),
		};
	}
	componentDidMount() {
		this._loadList();
	}
	clearList() {
		this.setState({
			listData: this.state.listData = [],
			dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
		});
	}

	_loadList() {
		return fetch(
			'http://192.168.1.57:9017/api/list?pagesize=' + pageSize + '&page=' + pageNow,
			{method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					listData: this.state.listData = this.state.listData.concat(responseJson.list),
					dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
				})
			})
			.catch((err) => {
				ToastAndroid.show('res-err!' + err.toString(), ToastAndroid.SHORT)
			})
			.done();
	}

	_goDetail(theId) {
		const {navigator} = this.props;
		if (navigator) {
			navigator.push({
				name: 'NoteDetail',
				component: NoteDetail,
				params:{id: theId},
			})
		}
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
				<View style={{flex: 1}}>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={(rowData, rowHasChanged) =>
							<TouchableOpacity onPress={() => this._goDetail(rowData._id)}>
								<View style={ style.cell }>
									<View style={style.cellTop}>
										<Text style={style.cellTitle} numberOfLines={1}>{rowData.body.title}</Text>
										<Text style={style.cellTime}>{rowData.body.date}</Text>
									</View>
									<Text style={style.cellContent} numberOfLines={2}>{rowData.body.content}</Text>
								</View>
							</TouchableOpacity>
						}></ListView>
				</View>
			</View>
		);
	}

	_jump() {
		const {navigator} = this.props;
		if (navigator) {
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
		backgroundColor: values.TITLE_COLOR,
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
	cell: {
		padding: 10,
		flexDirection: 'column',
		borderBottomWidth: 1,
		borderBottomColor: values.TITLE_COLOR_ANOTHER,
	},
	cellTop: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
	},
	cellTitle: {
		flex: 1,
		fontSize: 18,
		color: '#333333',
	},
	cellTime: {
		fontSize: 14,
		color: '#888888',
	},
	cellContent: {
		fontSize: 14,
		color: '#888888',
	}
});

export default ThirdPage;