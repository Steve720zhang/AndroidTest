'use strict'

import React from 'react';

import {
    StyleSheet,
    View,
    BackAndroid,
    Text,
    Platform,
    TouchableOpacity,
    Navigator
} from 'react-native';
import FirstPage from '../components/MainFragment';

class SampleComponent extends React.Component {
  render() {
    let defaultName = 'FirstPage';
    //一个初始首页的component名字，比如我写了一个component叫HomeComponent，那么这个name就是这个组件的名字【HomeComponent】了。
    let defaultComponent = FirstPage;
    // 这个组件的Class，用来一会儿实例化成 <Component />标签
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        //这个指定了默认的页面，也就是启动app之后会看到界面的第一屏。 需要填写两个参数: name 跟 component。
        configureScene={(route) => {
          return Navigator.SceneConfigs.FadeAndroid;
          //HorizontalSwipeJumpFromRight
          //VerticalDownSwipeJump
          //HorizontalSwipeJump
          //FadeAndroid
          //这个是页面之间跳转时候的动画
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          // 传递navigator 使得下一个页面可以使用。
          return <Component {...route.params} navigator={navigator} />
        }} 
       />
    );
  }
} 

//navigator的跳转样式总共都有些什么？可查如下：
//node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

const styles = StyleSheet.create({
});

export default SampleComponent;