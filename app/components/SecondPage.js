'use strict'

import React, { Component } from 'react';
import {
	View,
	Text,
	Navigator,
	TouchableOpacity
} from 'react-native';
import AnoPage from './AnoPage';

class SecondPage extends Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	_jumpB() {
		const { navigator } = this.props; 
		    //为什么这里可以取得 props.navigator?请看上文:
		    //<Component {...route.params} navigator={navigator} />
		    //这里传递了navigator作为props
	    if(navigator) {
	        navigator.pop();
        }
    }
	
	_jump() {
		const { navigator } = this.props;
		    //为什么这里可以取得 props.navigator?请看上文:
		    //<Component {...route.params} navigator={navigator} />
		    //这里传递了navigator作为props
	    if(navigator) {
	        navigator.push({
            name: 'AnoPage',
            component: AnoPage,
        	})
	    }
	}
	render() {
		return (
			<View>
				<Text>SecondPage!</Text>
				<TouchableOpacity onPress={this._jumpB.bind(this)}>
					<Text>BackFirst</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={this._jump.bind(this)}>
					<Text>jumpUp!</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default SecondPage;
