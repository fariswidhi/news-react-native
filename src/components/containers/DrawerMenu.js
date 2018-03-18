import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  TouchableHighlight,
  AsyncStorage
} from "react-native";

import { NavigationActions } from "react-navigation";

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
    // AsyncStorage.getItem('data',(err,res)=>{
    //     if (err) {
    //       this.fetch();
    //     }
    // });
    // AsyncStorage.removeItem('data');
  }

  alert(){
    Alert.alert('ad','a');
  }
  _navigate(route) {
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: `${route}` })]
      })
    );
  }
      _onPress(item,category){

    this.props.navigation.navigate('HomeScreen',{
      slug: item,
      category:category
    });

  }

    fetch(){

    this.setState({refreshing:true});
    return fetch('http://10.42.0.1:8000/api/categories')
    .then((response)=>response.json())
    .then((responseJson)=>{
      // this.setState({
      //   refreshing:false,
      //   dataSource: responseJson.data
      // },function(){

      // });
      // Alert.alert('ok',JSON.stringify(responseJson.data));
      this.saveAsync(responseJson.data);
    })
    .catch((err)=>{
      // console.error(err);
      Alert.alert('Info','Gagal Memuat berita');
    })                                  

    }                                                                             
    saveAsync(data){                                              
      // Alert.alert('i',data);
      AsyncStorage.setItem('data',JSON.stringify(data),(err,res)=>{
        if (res) {                                                                                                                                              
          Alert.alert('success','success');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ;
        }
        else{
          // console.log(err);
          Alert.alert('Info','error save AsyncStorage'+err);
        }
      });                                                                                             
    }

    getAsync(){
      AsyncStorage.getItem('data',(err,result)=>{
        if (result) {
          this.setState({
              dataSource: JSON.parse(result),
              refreshing: false
          });
        }
        else{
          this.fetch();
          Alert.alert('info','Data On AsyncStorage Not Found');
        }
      });

    }

    componentDidMount(){
      // this.fetch();
          // this.fetch();

          this.getAsync();
      // Alert.alert('a','a');
    }
  render() {
    return (
      <View style={styles.container}>
      <Text>

      </Text>
      <FlatList
style={{flexDirection: 'column'}}
numColumns={1}
keyExtractor={(item, index) => index.toString()}
  data={this.state.dataSource}
  renderItem={({item}) => 



        <TouchableOpacity
          style={styles.menuItem}
    onPress={()=>this._onPress(item.slug,item.category)}
        >
          <Text style={styles.menuItemText}>{item.category}</Text>
        </TouchableOpacity>

  
  }
/>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20
  }
});

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;