'use strict';

import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ListView,
	ToastAndroid
} from 'react-native';
const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

class TwoPage extends Component {
	constructor(props) {
		super(props);
		var listData = [];
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listData: listData = listData.concat([{
				"league_id": "2015",
				"team_id": "6386",
				"team_cn": "广州恒大!!!",
				"team_order": "1",
				"count": "30",
				"win": "19",
				"lose": "1",
				"draw": "10",
				"goal": "71",
				"losegoal": "28",
				"truegoal": "43",
				"score": "67",
				"group": "",
				"home_score": "27",
				"away_score": "40",
				"home_win": "6",
				"away_win": "13",
				"home_lose": "0",
				"away_lose": "1",
				"home_draw": "9",
				"away_draw": "1",
				"home_goal": "39",
				"away_goal": "32",
				"home_losegoal": "17",
				"away_losegoal": "11",
				"home_truegoal": "22",
				"away_truegoal": "21",
				"man_ctrl": "999",
				"opta_id": "6386",
				"sl_id": "5065",
				"logo": null
			},    {
				"league_id": "2015",
				"team_id": "7697",
				"team_cn": "上海上港!!!!",
				"team_order": "2",
				"count": "30",
				"win": "19",
				"lose": "3",
				"draw": "8",
				"goal": "63",
				"losegoal": "35",
				"truegoal": "28",
				"score": "65",
				"group": "",
				"home_score": "35",
				"away_score": "30",
				"home_win": "11",
				"away_win": "8",
				"home_lose": "2",
				"away_lose": "1",
				"home_draw": "2",
				"away_draw": "6",
				"home_goal": "36",
				"away_goal": "27",
				"home_losegoal": "20",
				"away_losegoal": "15",
				"home_truegoal": "16",
				"away_truegoal": "12",
				"man_ctrl": "999",
				"opta_id": "7697",
				"sl_id": "41300",
				"logo": null
			}]),
			dataSource: dataSource.cloneWithRows(listData),
		};
	}

	render() {
		return (
			<View style={styles.whole}>
				<View style={styles.top_container}>
					<View style={styles.testStyle}>
						<Text>SecoundPage</Text>
					</View>
				</View>
				<View></View>
				<View style={styles.bottomStyle}>
					<View style={styles.bottomUp}>
						<Text>屏幕宽度{SCREEN_WIDTH}</Text>
						<ScrollView horizontal={true}>
							<TouchableOpacity onPress={this.reqHttp.bind(this)} style={styles.buttonContainer}><Text style={styles.button}>加载列表</Text></TouchableOpacity>
							<TouchableOpacity onPress={this.clearList.bind(this)} style={styles.buttonContainer}><Text style={styles.button}>clearList</Text></TouchableOpacity>
							<TouchableOpacity style={styles.buttonContainer}><Text style={styles.button}>3</Text></TouchableOpacity>
							<TouchableOpacity style={styles.buttonContainer}><Text style={styles.button}>4</Text></TouchableOpacity>
						</ScrollView>
					</View>
					<View style={styles.bottomDown}>
						<ListView
							enableEmptySections={true}
							dataSource={this.state.dataSource}
							renderHeader={() =>
								<View><Text>我是Header</Text></View>
							}
							renderFooter={() =>
								<View><Text>Footer</Text></View>
							}
							renderRow={(rowData,rowHasChanged) =>
								<View style={styles.buttons}>
									<Text>名称：{rowData.team_cn}</Text>
									<Text>排名：{rowData.team_order}</Text>
									<Text>进球数：{rowData.goal}</Text>
								</View>
							}>
						</ListView>
					</View>
				</View>
			</View>
		);
	}
	clearList() {
		this.setState({
			listData: this.state.listData = [],
			dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
		});
	}
	reqHttp() {
		return fetch(
			'http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=football&_sport_s_=opta&_sport_a_=teamOrder&type=213&season=2015&format=json',
			{method: 'GET'})
		.then((response) => response.json())
		.then((responseJson) => {
				ToastAndroid.show('response:'+ responseJson.result.data.length, ToastAndroid.SHORT);
				// this._onDataArrived([4,5,6,6,7,7,6,54,34,3,3,3,10])
				this.setState({
					listData: this.state.listData = this.state.listData.concat(responseJson.result.data),
					dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
				})
		})
		.catch((err) => {
			ToastAndroid.show('res-err!'+err.toString(), ToastAndroid.SHORT)
		})
		.done();
	}
}

const styles = StyleSheet.create({
	whole: {
		width: SCREEN_WIDTH,
		flex: 1,
		backgroundColor: '#fefefe',
	},
	buttonContainer: {
		justifyContent: 'center',
		height: 80,
		margin: 15,
		alignItems: 'center',
	},
	button: {
		fontSize: 25,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ff9999',
		padding: 20,
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
	},
	buttons: {
		margin: 10,
	},
	headFoot: {

	},
});

export default TwoPage;