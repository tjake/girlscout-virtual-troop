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

import globals from '../globals'
import PropTypes from 'prop-types'


import G from '../globals'
import API from '../API'

var moment = require('moment');
var date = new Date();
var offsetInMillis = date.getTimezoneOffset() * 60 * 1000;


export default class Vote extends Component {

  static propTypes = {
    //pageName: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    
    this.state = {
      profile: null,
      votes: null,
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
      }
    })
  }

  render() {
    return (
        <View style={Styles.outerContainer}>
          <View style={Styles.topContainer}>
              <Text style={{fontSize: 20}}>Voting {this.state.troop ? "Troop " + this.state.troop : "Screen"}!</Text>
          </View>
        </View>
      );
  }
}