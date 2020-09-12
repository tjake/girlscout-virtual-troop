import {StyleSheet, StatusBar} from 'react-native';

export const colors = {
  black: '#000000',
  gray: '#AAAAAA',
  yellow: '#FFFF00',
  white: '#FFFFFF',
  blue: '#0066CC',
  green: '#00AE58',
  brown: '#854400',
  khaki: '#D5C99E',
  primary: '#000000',
  secondary: '#00AE58',
  lightGrey: '#000000'
};

export default StyleSheet.create({
    safeArea: {
      paddingVertical: StatusBar.currentHeight,
      flex: 1,
      backgroundColor: colors.white
    },
    wrapper: {
        flex:1, 
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff'
    },
    outerContainer: {
        flex:1
    },
    topContainer: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomContainer: {
        flex:0.8
    },
    hideTabStyle: {
      height: 0,
      overflow: 'hidden'
    },
    hideTabScene: {
      paddingBottom:0
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.brown,
    },
    welcome: {
      fontSize: 20,
      color: colors.black,
      textAlign: 'center',
      margin: 10,
    },
    error: {
      fontSize: 20,
      color: colors.red,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    scrollview: {
      flex: 1
    }
});