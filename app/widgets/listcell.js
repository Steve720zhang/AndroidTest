import React from 'react';
import {
	Navigator,
	View,
	Text,
	ListView,
	Image,
	StyleSheet,
	ScrollView,
	RecyclerViewBackedScrollView,
	TouchableOpacity
} from 'react-native';

class listcell extends React.Component{
	render() {
		return (
			<View>
				<Image style={styles.logo}
		        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
			</View>
		);
	}
}

const sty = StyleSheet.create({
	logo: {
		width:30,
		height:30,
	}
});

export default listcell;