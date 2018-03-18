import { AppRegistry } from 'react-native';
import App from './App';
import HomeScreen from './src/components/HomeScreen';
import DetailScreen from './src/components/DetailScreen';

import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

import DrawerMenu from './src/components/containers/DrawerMenu';

const stackNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
}, {
  headerMode: 'none'
});

const easyRNRoute = DrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Stack: {
    screen: stackNavigator
  }
}, {
  contentComponent: DrawerMenu,
  contentOptions: {
    activeTintColor: '#e91e63',
    style: {
      flex: 1,
      paddingTop: 15,
    }
  }
});

AppRegistry.registerComponent('MyNewProject', () => easyRNRoute);
