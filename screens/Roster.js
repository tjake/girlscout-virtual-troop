import React, { Component } from 'react'
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  SectionList,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform
} from 'react-native'
import Styles, {colors} from '../Styles'
import { ListItem, Avatar } from 'react-native-elements';

import G from '../globals'
import API from '../API'
import PropTypes from 'prop-types'

var moment = require('moment');
var date = new Date();
var offsetInMillis = date.getTimezoneOffset() * 60 * 1000;


export default class Roster extends Component {

  static propTypes = {
    //pageName: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    
    this.state = {
        profile: null,
        roster: null,
    }

    this.onRefresh = this.onRefresh.bind(this)

    this.onRefresh()
  }

  
  onRefresh() {
    API.readItemFromStorage(G.KEY_PROFILE)
    .then(value => {
      if (value != null) {
        profile = JSON.parse(value)
        this.setState({profile: profile, troop: profile.troopNumber })
        return API.readMembersFromAstra(profile.troopNumber)
      }
    })
    .then(members => {
        if (members != null) {
          console.log(members.data)
          this.setState({roster: members.data})
        }
    })
  }

  render() {
    return (
        <View style={Styles.outerContainer}>
          <View style={Styles.topContainer}>
              <Text style={{fontSize: 20}}>Roster {this.state.troop ? "for Troop " + this.state.troop  : "Screen"}!</Text>
          </View>

          <View>
          {this.state.roster ?
            Object.entries(this.state.roster).map((l) => (
              <ListItem key={l[0]} bottomDivider>
               <Avatar size={80}
                  title={l[1].emoji}
                  rounded={true}
                  titleStyle={{color: colors.black}}
                  containerStyle={{backgroundColor: colors.khaki, opacity: 0.8, fontSize:64}}></Avatar>
                <ListItem.Content>
                  <ListItem.Title>{l[1].name}</ListItem.Title>
                  <ListItem.Subtitle>{l[1].type}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          : null}
          </View>
        </View>
      );
  }
}