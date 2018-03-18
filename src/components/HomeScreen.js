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
  TextInput,
  DrawerLayoutAndroid,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import App from '../../App';
import DetailScreen from './DetailScreen';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class HomeScreen extends Component {


  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this._onPress = this._onPress.bind(this);
    const id = params ? params.slug : null;
    const categoriesName = params ? params.category : null;
    this.state = {
      params : id,
      refreshing: false
    }

  }

    static navigationOptions = ({navigation}) => 
    ({  

      title: navigation.state.params == null ? 'Home': navigation.state.params.category
    });



  _onPress(item){
    this.props.navigation.navigate('DetailScreen',{
      slug: item.slug
    });
  }

  onPressButton(){
 this.setState({isLoggedIn : true});

    Alert.alert("Hallo","Email :"+this.state.email+" & Password = " +this.state.password);
  }
  _onRefresh(){

    this.fetch();



  }
  fetch(){
    var url ='';
    if (this.state.params==null) {
      url = URL+'/api/articles';
    }
    else{

      url = URL+'/api/categories/'+this.state.params;
    }
    this.setState({refreshing:true});
    return fetch(url)
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        refreshing:false,
        dataSource: responseJson.data
      },function(){

      });
    })
    .catch((err)=>{
      // console.error(err);

    })

  }
  componentDidMount(){
    this.fetch();
  }

  funct(){
    Alert.alert('a','i');
  }
  render() {
    

      const navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  );
  if (this.state.refreshing) {
    return(
  
          <View style={{flex: 1, padding: 20}}>
          
            <ActivityIndicator/>


            <Text 
            style={{textAlign:'center'}}
            onPress={()=>{this.fetch()}}
            >
            Load Again
            </Text>

          </View>
    )
  }
  
    return (



      <View style={{flex: 1}}>


<FlatList
style={{flexDirection: 'column'}}
numColumns={1}
keyExtractor={(item, index) => index.toString()}
refreshControl={
  <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh.bind(this)}
      tintColor="#ff0000"
      title="Loading..."
      titleColor="#ffffff"
      colors={['#ffffff']}
      progressBackgroundColor="#1976D2"
  />
}
  data={this.state.dataSource}
  renderItem={({item}) => 
  <TouchableHighlight

  onPress={()=>this._onPress(item)}
  >
    <View style={styles.wrapper} key={item.slug}>

<Image source={{uri: URL+'uploads/'+item.photo}}
       style={styles.thumb} />
  <Text style={styles.itemList}>{item.title}</Text>
</View>
</TouchableHighlight>
  
  }
/>

      </View>

    );
  }
}

const URL = 'http://10.42.0.1:8000/';
const styles = StyleSheet.create({
  thumb: {
    flex:0.3,
    height:100,
  },  
  wrapper: {
    backgroundColor: '#fff',
    marginTop:5,
    flex:1,
    flexDirection:'row'
  },
  itemList: {
    padding: 10,
    fontSize: 18,
    textAlign: 'left',
    fontSize: 20,
    fontWeight:'bold',
    flex:0.7
  },
  container: {
    flex: 1,
    backgroundColor: '#446CB3',

  },
  item: {
  color: '#000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  DetailScreen: {
    screen: DetailScreen
  }
});