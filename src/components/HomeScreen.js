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
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

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

      title: navigation.state.params == null ? 'Home': navigation.state.params.category,
      header: <View
    style={{
      flexDirection: "row",
      height: 50,
      backgroundColor:'#1976D2',
      marginTop: Platform.OS == "ios" ? 20 : 0 // only for IOS to give StatusBar Space
    }}
  >


                <Icon.Button name="ios-menu" 
  style={{width:40,height:20,marginTop:15,marginLeft:15}}
backgroundColor='transparent'
onPress = {()=>{navigation.navigate('DrawerOpen')}}
  >
  </Icon.Button>

    <Text style={{marginTop:13,fontSize:20,fontWeight:'bold',color:'#fff'}}> {navigation.state.params == null ? 'Home': navigation.state.params.category}</Text>
  </View>
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
  this.fetchCategory();

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

  fetchCategory(){
        return fetch('http://10.42.0.1:8000/api/categories')
    .then((response)=>response.json())
    .then((responseJson)=>{
      // this.setState({
      //   refreshing:false,
      //   dataSource: responseJson.data
      // },function(){

      // });

            AsyncStorage.getItem('data',(err,result)=>{

            // Alert.alert('inof','in '+JSON.parse(result).length);

            // Alert.alert('inof','in '+responseJson.data.length);

            if (responseJson.data.length != JSON.parse(result).length) {
                           
              Alert.alert('info','a = '+responseJson.data);
              AsyncStorage.removeItem('data');
      AsyncStorage.setItem('data',JSON.stringify(responseJson.data));

            }
      //         if (!err) {
      //   if (JSON.parse(result).length != responseJson.data.length) {
      // AsyncStorage.removeItem('data');



      // AsyncStorage.setItem('data',JSON.stringify(responseJson.data));                                                                                             

      //   }
      //   else{

      //     Alert.alert('info','Data On AsyncStorage Not Found'+err);
      //   }

      //         }
      });



    })
    .catch((err)=>{
      // console.error(err);
      Alert.alert('Info','Failed to Load'+err);
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
      tintColor="#1976D2"
      title="Loading..."
      titleColor="#1976D2"
      colors={['#1976D2']}
      progressBackgroundColor="#fff"
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