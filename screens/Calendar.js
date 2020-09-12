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

import G from '../globals'
import API from '../API'
import PropTypes from 'prop-types'

var moment = require('moment');
var date = new Date();
var offsetInMillis = date.getTimezoneOffset() * 60 * 1000;

//TODO, clean this up
let styles = StyleSheet.create({
  outerContainer: {
    flex:1
  },
  topContainer: {
    flex: 0.5
  },
  bottomContainer: {
      flex:0.5
  },
  // ListView
  list: {
    flex: 1
  },
  // SectionHeader
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: colors.secondary,
    height: 30,
    justifyContent: 'center'
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center'
  },
  // Row
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  timeContainer: {
    width: 40
  },
  timeText: {
    color: colors.lightGrey,
    textAlign: 'right'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#88C057',
    position: 'absolute',
    left: -5,
    top: 0
  },
  details: {
    borderColor: colors.lightGrey,
    borderLeftWidth: 1,
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20,
    paddingLeft: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 6
  },
  titleSingle: {
    marginBottom: 0
  },
  speakerInfo: {
    flexDirection: 'row'
  },
  speakerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  speakerDescription: {
    flex: 1
  },
  separator: {
    height: .5,
    backgroundColor: colors.lightGrey,
    marginTop: 15,
    marginBottom: 15
  }
});



export default class Calendar extends Component {

  static propTypes = {
    //pageName: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    
    this.state = {
      profile: null,
      calendar: [
        {title: 'Saturday, Sept 12', data:{
          startTime: '5:30',
          endTime: '7:00',
          title: 'Visit Local Aquarium',
          speaker: {
            name: 'Andrew Clark',
            company: 'Mystic Aquarium',
            avatarUrl: 'http://conf.reactjs.com/img/andrew-clark.jpg'
          },
          description: [
            "Learn about marine life!",
            "Feed the seals!"
          ]
      }},
    ]
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
        return API.readCalendarFromAstra(profile.troopNumber)
      }
    })
    .then(cal => {
       if (cal != null) {
        console.log(cal.data)
        this.setState({calendar: cal.data})
      }
    })    
  }

  renderRow(item, sectionID, rowID) {
    let rowData = item.item
    let title = <Text style={[styles.title, styles.titleSingle]}>{rowData.title}</Text>;
    let circleStyle;
    let companyLabel;
    let content;

    if(rowData.speaker) {
      circleStyle = {backgroundColor: colors.secondary};
      if(rowData.speaker.company) {
        companyLabel = `(${rowData.speaker.company})`;
      }
      title = (
        <View style={styles.speakerInfo}>
          <Image style={styles.speakerAvatar} source={{uri: rowData.speaker.avatarUrl}} />
          <View style={styles.speakerDescription}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.speakerName}>{rowData.speaker.name} { companyLabel }</Text>
          </View>
        </View>
      )
    }

    content = (
      <View style={styles.row}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{rowData.startTime}</Text>
        </View>
        <View style={styles.details}>
          <View style={[styles.circle, circleStyle]}></View>
            { title }
          <View style={styles.separator}></View>
        </View>
      </View>
    );

    if(rowData.speaker) {
      return (
        <TouchableOpacity onPress={() => this._onRowPressed(rowData)} key={rowID}>
          { content }
        </TouchableOpacity>
      );
    }

    return (
      <View key={rowID}>
        { content }
      </View>
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    let headerStyles = {
      // height: scrollDistance.interpolate({
      //   inputRange: [40, 130],
      //   outputRange: [130, 40],
      //   extrapolate: 'clamp',
      // })
    };

    return (
      <Animated.View style={[styles.sectionHeader, headerStyles]}>
        <Text style={styles.sectionHeaderText}>
          {sectionData.section.title}
        </Text>
      </Animated.View>
    );
  }

  _onRowPressed(rowData) {
   
  }

  render() {
    return (
        <View style={Styles.outerContainer}>
          <View style={Styles.topContainer}>
              <Text style={{fontSize: 20}}>Calendar {this.state.troop ? "for Troop " + this.state.troop : "Screen"}!</Text>
          </View>
          <View style={Styles.bottomContainer}>
          <SectionList
            ref={this.flatList}
            style={styles.list}
            sections={this.state.calendar}
            renderItem={this.renderRow.bind(this)}
            renderSectionHeader={this.renderSectionHeader.bind(this)}
            scrollEventThrottle={16}
            keyExtractor={item => "" + item.startTime}
            automaticallyAdjustContentInsets={false} />
          </View>
        </View>
      );
  }
}