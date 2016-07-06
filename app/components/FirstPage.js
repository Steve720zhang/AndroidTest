'use strict';

import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Navigator
} from 'react-native';

import SecondPage from './SecondPage';

class FirstPage extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	_pressButton() {
		const { navigator } = this.props;
		    //为什么这里可以取得 props.navigator?请看上文:
		    //<Component {...route.params} navigator={navigator} />
		    //这里传递了navigator作为props
		    if(navigator) {
		        navigator.push({
	            name: 'SecondPage',
	            component: SecondPage,
	        })
	    }
	}
	render() {
		return (
			<View >
				<Text>FirstPage</Text>
				<Text>~~~~~~~~~~!!!</Text>
				<TouchableOpacity style={styles.styleOne} onPress={this._pressButton.bind(this)}>
				<Text>跳转SecondPage</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  styleOne: {
  	width:100,
  	height:60,
  },
  styleTwo: {
    
  }
});


export default FirstPage;