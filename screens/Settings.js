import React, { Component } from 'react'
import {
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  SectionList,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform
} from 'react-native'
import { Avatar, Accessory } from 'react-native-elements';

import Styles, {colors} from '../Styles'
import t from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import EmojiSelector, { Categories } from "react-native-emoji-selector";


import G from '../globals'
import PropTypes from 'prop-types'
import API from '../API'

var moment = require('moment');
var date = new Date();
var offsetInMillis = date.getTimezoneOffset() * 60 * 1000;

var Form = t.form.Form;


var ProfileType = t.enums({
  Member: 'Troop Member',
  Leader: 'Troop Leader',
  Guardian: 'Guardian'
});


var Profile = t.struct({
  name: t.String,
  email: t.String,
  troopNumber: t.Number,
  type: ProfileType,
  emoji: t.maybe(t.String)
});

var options = {
  //auto: 'placeholders',
  fields: {
    emoji: {
      hidden: true
    },
    type: {
      label: 'Profile Type'
    },
    troopNumber: {
      label: 'Troop Number'
    }
  }
};

export default class Settings extends Component {

  static propTypes = {
    //pageName: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
        loading: true,
        pickAvatar: false,
        profile: null,
        showSave: false,
        emoji: "ME",
    }

    this.onRefresh = this.onRefresh.bind(this)
    this.saveProfile = this.saveProfile.bind(this);
    this.profileChange = this.profileChange.bind(this);

    this.onRefresh()
  }

  
  onRefresh() {
    API.readItemFromStorage(G.KEY_PROFILE)
      .then(json => {
        if (json != null) {
          profile = JSON.parse(json)
          this.setState({profile: profile, before: profile})
          if (profile.emoji != null)
            this.setState({emoji: profile.emoji})
        }
      })
  }

  saveProfile() {
    value = this._formRef.getValue();

    if (value != null) { 

      if (this.state.before != null && this.state.before.troopNumber != null && this.state.before.troopNumber != value.troopNumber) {
        Alert.alert("You can't change your troop number once set")
        return;
      }

      if (this.state.before != null && this.state.before.email != null && this.state.before.email != value.email) {
        Alert.alert("You can't change your email once set")
        return;
      }

      if (this.state.emoji != null) {
        //Work around readonly struct
        value = JSON.parse(JSON.stringify(value))
        value.emoji = this.state.emoji
      }

      API.writeProfileToAstra(value)
      .then(() => API.writeItemToStorage(G.KEY_PROFILE, JSON.stringify(value)))
      .then(() => this.setState({showSave: false}))
      .then(() => Alert.alert("Profile Saved " + this.state.emoji))
      .catch((e) => Alert.alert(e))
    }
  }

  profileChange(profile) {

    if (this.state.before != null && ((this.state.before.troopNumber != null && this.state.before.troopNumber != profile.troopNumber) 
        || (this.state.before.email != null && this.state.before.email != profile.email))) {
      console.log("You can't change your troop number once set")
    } else {
      this.setState({profile: profile})
    }

    this.setState({showSave: true})
  }

  pickAvatar() {
    return (
      <View style={Styles.outerContainer}>
                  <Text>Please select the emoji you would like to use:</Text>

      <View style={Styles.topContainer}>
        <Text style={{ fontSize: 64, alignItems: 'center'}}>
          {this.state.emoji}
        </Text>
      </View>
      <View style={Styles.bottomContainer}>
      <EmojiSelector
        onEmojiSelected={emoji => this.setState({emoji: emoji})}
        showSearchBar={true}
        showTabs={true}
        showHistory={true}
        showSectionTitles={true}
        category={Categories.all}
      />
       <Icon.Button backgroundColor={colors.green} name='share' onPress={() => this.setState({pickAvatar: false, showSave: true})}>
          Back to Profile!
      </Icon.Button>
      </View>
     
    </View>
    )
  }

  showProfile() {
    return (
      <View style={Styles.wrapper}>

        <View style={Styles.topContainer}>
        <Avatar 
            size={80}
            title={this.state.emoji}
            rounded={true}
            titleStyle={{color: colors.black}}
            containerStyle={{backgroundColor: colors.gray, opacity: 0.8, marginBottom:80, fontSize:64}}
            onPress={() => this.setState({pickAvatar: true})}>
                  <Accessory type='font-awesome' name='edit'/>
            </Avatar>
        </View>

        <Form
          ref={(ref) => this._formRef=ref}
          type={Profile}
          options={options}
          onChange={this.profileChange}
          value={this.state.profile}/>

        <View style={{paddingVertical: 40}}>
          {this.state.showSave ?<Icon.Button style={{justifyContent: "center"}} backgroundColor={colors.green} name='save' onPress={this.saveProfile}>
            Save Profile
          </Icon.Button>
          : null }
      </View>
      </View>
    )
  }

  render() {

    return (
      <View style={Styles.wrapper}>
        {this.state.pickAvatar ? this.pickAvatar() : this.showProfile()}
      </View>
    )
   
  }
}