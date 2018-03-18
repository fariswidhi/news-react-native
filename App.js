/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  FlatList,
  TextInput
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from './src/components/HomeScreen';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component {

  static navigationOptions = {  header: null };


  constructor(props) {
    super(props);
  
 this.state = {isLoggedIn : false, email :"", password : ""};



  }

  onPressButton(){

// Alert.alert('Info',this.state.email);
 // if (this.state.email == 'a@a.com' && this.state.password =='a') {
 // this.setState({isLoggedIn : true});
    this.props.navigation.navigate('HomeScreen')    ;
 // }
 // else{

 // this.setState({isLoggedIn : false});
 //    Alert.alert('Gagal Masuk','Gagal Masuk');
 // }
  }

  render() {
    return (
      <View style={styles.container}>

      <Image 
        style={styles.logo}
        source={require('./logo.png')}
        />
      <Text style={styles.textLogo}>React Native Login</Text>


      <TextInput
        style={styles.input}
        placeholder="Username"
        underlineColorAndroid= "#fff"
        onChangeText={(text)=>this.setState({email:text})}
        placeholderTextColor="#fff"
        value={this.state.email}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        underlineColorAndroid= "#fff"
        placeholderTextColor="#fff"
        onChangeText={(pass)=>this.setState({password:pass})}
        secureTextEntry={true}
        />
<View style={{flexDirection: 'column'}}>
    <View style={{flex:1 ,width:300,marginTop:20}} >
        <Button title="Sign In" onPress={this.onPressButton.bind(this)}></Button>
    </View>
</View>

      </View>
    );
  }
}

export default StackNavigator({
  App: {
    screen: App,

  },

  HomeScreen: {
    screen: HomeScreen
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#446CB3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
  color: '#000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop:50,

  },
  textLogo: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 50
  },
  input: {
    height: 50,
    color: '#fff',
    width: 300,
    marginTop: 5,

  },
  button: {
      backgroundColor: 'red',
      borderColor: 'red',
      borderWidth: 5,
      borderRadius: 15,
      marginTop:50,
      padding: 20,
      margin:100
  }
});
