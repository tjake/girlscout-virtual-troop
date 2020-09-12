/**
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {SafeAreaView, StatusBar } from 'react-native';
import MainTabs from './MainTabs'
import Styles,  { colors } from './Styles'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './NavigationService';
import G from './globals'


class GirlScoutVirtualTroop extends Component {

  constructor(props){
    super(props);
    
    this.state = {
       
    }

    G.STATE = this

    console.disableYellowBox = true;
  }

  render() {
    return (
      <SafeAreaView style={Styles.safeArea}>
          <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}/>
          <MainTabs />
      </SafeAreaView>
    )
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: GirlScoutVirtualTroop},
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null
  }
}
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
