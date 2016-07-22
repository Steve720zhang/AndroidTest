'use strict'

import React,{ Component } from 'react';
import {
	Navigator,
	View,
	Text,
	RefreshControl,
	ListView,
	StyleSheet,
	ScrollView,
	ToastAndroid,
	Image,
	RecyclerViewBackedScrollView,
	TouchableOpacity
} from 'react-native';
const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class FourthPage extends Component{
  constructor(){
    super();
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 === r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
  }

  componentDidMount(){
    let that = this;

    setTimeout(()=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
        	['row 1', 'row 2','row 1', 'row 2','row 1', 
        	'row 2','row 1', 'row 2','row 1', 'row 2',
        	'row 1', 'row 2','row 1', 'row 2','row 1', 
        	'row 2','row 1', 'row 2','row 1', 'row 2',
        	'row 1', 'row 2','row 3'])
      });
    },1000);
  }
	render() {
	    return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(rowData,rowHasChanged) => 
					<View style={ style.cell }>
						<Text>{rowData +':-- '+ rowHasChanged}</Text>
						<Image style={style.logo}
							source={{uri: 'http://7xrgnr.com1.z0.glb.clouddn.com/icon5.jpg'}}/>
					</View>
				}>
			</ListView>
	    );
	}
	_onRefresh() {
		this.setState({isRefreshing: true});
		setTimeout(() => {
			ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT)
		}, 5000);
	}
}

const style = StyleSheet.create({
	main: {
    flex: 1,
	},
	cell: {
		flexDirection: 'row', 
		width: SCREEN_WIDTH, 
		padding: 20,
	},
	logo: {
		width:30,
		height:30,
	}
});

export default FourthPage;