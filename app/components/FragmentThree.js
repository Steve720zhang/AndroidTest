'use strict'

import React, {Component} from 'react';
import {
	Navigator,
	View,
	ListView,
	ToastAndroid,
	ScrollView,
	Text,
	RefreshControl,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import AddNote from './views/AddNote';
import NoteDetail from './views/NoteDetail';


var pageSize = 10;
var pageNow = 1;
var canLoad = true;

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
		this._loadList(true);
	}

	clearList() {
		this.setState({
			listData: this.state.listData = [],
			dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
		});
	}

	_loadList(clear) {
		return fetch(
			'http://192.168.1.57:9017/api/list?pagesize=' + pageSize + '&page=' + pageNow,
			{method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					listData: clear ? this.state.listData = responseJson.list : this.state.listData = this.state.listData.concat(responseJson.list),
					dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
					canLoad: canLoad = (responseJson.list.length < 10) ? false : true,
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
				params: {id: theId},
			})
		}
	}

	_onRefreshed() {
		canLoad = true
		pageNow = 1
		this._loadList(true);
		ToastAndroid.show('onRefreshed\npageNow:' + pageNow, ToastAndroid.SHORT)
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
						onEndReachedThreshold={1}
						onEndReached={() => this._loadMore()}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing = false}
								onRefresh={this._onRefreshed.bind(this)}
								colors={['#691A99']}
								progressBackgroundColor="#fff"
							/>
						}
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={(rowData, rowHasChanged) =>
							<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
							            scrollsToTop={true}
							            alwaysBounceHorizontal={true}>
								<View style={{flexDirection: 'row', width: (SCREEN_WIDTH + 50)}}>
									<TouchableOpacity onPress={() => this._goDetail(rowData._id)}>
										<View style={ style.cell }>
											<View style={style.cellTop}>
												<Text style={style.cellTitle} numberOfLines={1}>{rowData.body.title}</Text>
												<Text style={style.cellTime}>{rowData.body.date}</Text>
											</View>
											<Text style={style.cellContent} numberOfLines={1}>{rowData.body.content}</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this._Detele(rowData._id)}>
										<View style={{backgroundColor: '#ff3333', width: 50, flex: 1,}}>
											<Text style={{color: '#fcfcfc'}}>删除</Text>
										</View>
									</TouchableOpacity>
								</View>
							</ScrollView>
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

	_loadMore() {
		if (!canLoad) {
			ToastAndroid.show('没有更多了', ToastAndroid.SHORT)
			return;
		}
		if (this.state.listData.length === 0) return;
		pageNow += 1;
		ToastAndroid.show('loadMore\npageNow:' + pageNow, ToastAndroid.SHORT)
		this._loadList(false)
	}

	_Detele(id) {//http://localhost:9017/api/delete/?id=57a054a3621d322200b735aa
		pageNow = 1;
		return fetch(
			'http://192.168.1.57:9017/api/delete?id=' + id,
			{method: 'GET'})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.rr === 1) {
					ToastAndroid.show('删除成功', ToastAndroid.SHORT)
					this._loadList(true);
				} else {
					ToastAndroid.show('操作失败', ToastAndroid.SHORT)
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
		width: SCREEN_WIDTH,
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