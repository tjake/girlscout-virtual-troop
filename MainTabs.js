import React, { Component } from 'react';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Dimensions} from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const basePx = 375
const deviceW = viewportHeight > viewportWidth ? viewportWidth : viewportHeight

import G from "./globals"
import Styles, {colors} from './Styles'
import Calendar from './screens/Calendar';
import Roster from './screens/Roster';
import Vote from './screens/Vote';
import Settings from './screens/Settings';

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class MainTabs extends Component {

  constructor(){
    super()

    this.state = {
      selectedTab: 'home'
    }
  }

    render() {
        return (
            <TabNavigator tabBarStyle={Styles.container}>
               <TabNavigator.Item
                selected={this.state.selectedTab === 'home'}
                title="Calendar"
                selectedTitleStyle={{color: colors.khaki}}                
                titleStyle={{color: colors.khaki}}
                renderIcon={() => <Icon name="calendar" size={px2dp(22)} color={colors.khaki}/>}
                renderSelectedIcon={() => <Icon name="calendar" size={px2dp(22)} color={colors.green}/>}
                onPress={() => {
                  this.setState({selectedTab: 'home'})
                  if (this.cal != null)
                    this.cal.onRefresh()
                }}>
                <Calendar ref={(c) => this.cal = c}/>
              </TabNavigator.Item>

              <TabNavigator.Item
                selected={this.state.selectedTab === 'roster'}
                title="Roster"
                selectedTitleStyle={{color: colors.khaki}}
                titleStyle={{color: colors.khaki}}
                renderIcon={() => <Icon name="users" size={px2dp(22)} color={colors.khaki}/>}
                renderSelectedIcon={() => <Icon name="users" size={px2dp(22)} color={colors.green}/>}
                onPress={() => {
                  this.setState({selectedTab: 'roster'})
                  if (this.ros != null)
                    this.ros.onRefresh()
                }}>
                <Roster ref={(c) => this.ros = c}/>
              </TabNavigator.Item>

              <TabNavigator.Item
                selected={this.state.selectedTab === 'vote'}
                title="Vote"
                selectedTitleStyle={{color: colors.khaki}}
                titleStyle={{color: colors.khaki}}
                renderIcon={() => <Icon name="thumbs-up" size={px2dp(22)} color={colors.khaki}/>}
                renderSelectedIcon={() => <Icon name="thumbs-up" size={px2dp(22)} color={colors.green}/>}
                onPress={() => {
                  this.setState({selectedTab: 'vote'})
                  if (this.vote != null)
                    this.vote.onRefresh()
                }}>
                <Vote ref={(c) => this.vote = c}/>
              </TabNavigator.Item>

              <TabNavigator.Item
                selected={this.state.selectedTab === 'settings'}
                title="Settings"
                selectedTitleStyle={{color: colors.khaki}}
                titleStyle={{color: colors.khaki}}
                renderIcon={() => <Icon name="id-card" size={px2dp(22)} color={colors.khaki}/>}
                renderSelectedIcon={() => <Icon name="id-card" size={px2dp(22)} color={colors.green}/>}
                onPress={() => {
                  this.setState({selectedTab: 'settings'})
                  if (this.settings != null)
                    this.settings.onRefresh()
                }}>
                <Settings ref={(c) => this.settings = c}/>
              </TabNavigator.Item>

           </TabNavigator>
        );
    }
}