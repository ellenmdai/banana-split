// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//         <Text>HIIIII</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import { SecondScreen } from './screens/SecondScreen';

const RootStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Second: {
      screen: SecondScreen
    },
  },
  {
    initialRouteName: 'Home'
});

export class App extends React.Component {
  render() {
    return <RootStack />;
  }
}