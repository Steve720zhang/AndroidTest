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

import TabNavigator from '../../node_modules/react-native-tab-navigator-master/TabNavigator';
import TabNavigatorItem from '../../node_modules/react-native-tab-navigator-master/TabNavigatorItem';
import Fragment2 from './SecondPage';
import Fragment3 from './ThirdPage';
import Fragment4 from './FourthPage';
import AnoPage from './AnoPage';

const TAB_NORMAL_1=require('../imgs/tabbar_1.png');
const TAB_NORMAL_2=require('../imgs/tabbar_2.png');
const TAB_NORMAL_3=require('../imgs/tabbar_3.png');
const TAB_NORMAL_4=require('../imgs/tabbar_4.png');

const TAB_PRESS_1=require('../imgs/tabbar_1_press.png');
const TAB_PRESS_2=require('../imgs/tabbar_2_press.png');
const TAB_PRESS_3=require('../imgs/tabbar_3_press.png');
const TAB_PRESS_4=require('../imgs/tabbar_4_press.png');
import AndroidBack from '../widgets/AndroidBack';

class FirstPage extends React.Component {
  componentDidMount() {
    AndroidBack.addBackAndroidListener(this.props.navigator); 
  }
	constructor(props) {
		super(props);
		this.state = {
			selectedTab:'Home',
		};
	}
	onPress(tabName){
		if(tabName){
			this.setState(
				{
					selectedTab:tabName,
				}
			);
		}
	}
  /**
  * 在此进行底部bar的渲染。
  **/
  renderTabView(title,tabName,tabContent,isBadge){
	var tabNomal;
	var tabPress;
	var viewtoshow;
	switch (tabName) {
		case 'Home':
		tabNomal=TAB_NORMAL_1;
		tabPress=TAB_PRESS_1;
		viewtoshow = this.pageOne();
		break;
		case 'Video':
		tabNomal=TAB_NORMAL_2;
		tabPress=TAB_PRESS_2;
		viewtoshow = this.getSecondPage();
		break;
		case 'Follow':
		tabNomal=TAB_NORMAL_3;
		tabPress=TAB_PRESS_3;
		viewtoshow = this.getThirdPage();
		break;
		case 'Mine':
		tabNomal=TAB_NORMAL_4;
		tabPress=TAB_PRESS_4;
		viewtoshow = this.getFourthPage();
		break;
		default:
	}
	return(
    <TabNavigatorItem
			title={title}
			renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}
			renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}
			selected={this.state.selectedTab===tabName}
			selectedTitleStyle={{color:'#f85959'}}
			onPress={()=>this.onPress(tabName)}
			renderBadge={()=>isBadge?
				<View style={styles.badgeView}>
				<Text style={styles.badgeText}>11</Text>
				</View>:null
			}
		>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      	{viewtoshow}
      </View>
    </TabNavigatorItem>
  );}
	_pressButton() {
		const { navigator } = this.props;
    if(navigator) {
        navigator.push({
          name: 'AnoPage',
          component: AnoPage,
      })
    }
	}
	_getNav() {
		const { navigator } = this.props;
    if(navigator) {
    	return navigator;
    }
	}
	tabBarView(){
    	return (
			<TabNavigator
				tabBarStyle={styles.tab}
				>
				{this.renderTabView('头条','Home','头条板块',true)}
				{this.renderTabView('视频','Video','视频板块',false)}
				{this.renderTabView('关注','Follow','关注板块',false)}
				{this.renderTabView('我的','Mine','我的板块',false)}
			</TabNavigator>
		);
	}
	pageOne() {
		return (
		<View>
			<TouchableOpacity  onPress={this._pressButton.bind(this)}>
				<Text>pageOne!</Text>
			</TouchableOpacity>
		</View>
		);
	}
	getSecondPage(){
		return(
			<Fragment2 navigator={ this._getNav() }></Fragment2>
			);
	}
	getThirdPage(){
		return(
			<Fragment3></Fragment3>
			);
	}
	getFourthPage(){
		return(
			<Fragment4></Fragment4>
			);
	}
	render() {
		const tabBarView = this.tabBarView();
		return (
			<View style={styles.container}>
				{tabBarView}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 backgroundColor: '#F5FCFF',
	},
	welcome: {
	 fontSize: 20,
	 textAlign: 'center',
	 margin: 10,
	},
	instructions: {
	 textAlign: 'center',
	 color: '#333333',
	 marginBottom: 5,
	},
	tab:{
	 height: 52,
	 alignItems:'center',
	 backgroundColor:'#f4f5f6',
	},
	tabIcon:{
	 width:25,
	 height:25,
	},
	badgeView:{
	 width:22,
	 height:14 ,
	 backgroundColor:'#f85959',
	 borderWidth:1,
	 marginLeft:10,
	 marginTop:5,
	 borderColor:'#FFF',
	 alignItems:'center',
	 justifyContent:'center',
	 borderRadius:8,
	},
	badgeText:{
	 color:'#fff',
	 fontSize:8,
	},
	styleOne: {
  	width:100,
  	height:60,
	},
	styleTwo: {

	}
});


export default FirstPage;