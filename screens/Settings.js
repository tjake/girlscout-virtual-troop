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

var moment = require('moment');
var date = new Date();
var offsetInMillis = date.getTimezoneOffset() * 60 * 1000;


export default class Settings extends Component {

  static propTypes = {
    //pageName: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    

    this.state = {
        loading: true,
        scrollOffset: 0
    }

    this.onRefresh = this.onRefresh.bind(this)

  }

  
  onRefresh() {

  }

  render() {
    return (
        <View style={Styles.outerContainer}>
          <View style={Styles.bottomContainer}>
              <Text>Settings Screen!</Text>
          </View>
        </View>
      );
  }
}