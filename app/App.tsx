import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, Header } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import { UploadScreen } from './screens/UploadScreen';
import { ReceiptInfoScreen } from './screens/ReceiptInfoScreen';

const RootStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Upload: {
      screen: UploadScreen
    },
    ReceiptInfo: {
      screen: ReceiptInfoScreen
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ac8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});
// The navigation prop is available to all screen components 
// (components defined as screens in route configuration and 
// rendered by React Navigation as a route).

export class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  main: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Header.HEIGHT
  }
})