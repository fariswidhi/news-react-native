import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  TouchableHighlight
} from "react-native";

import { NavigationActions } from "react-navigation";

class Service extends Component{

	func(){
		// Alert.alert('ok','i');
		    this.setState({refreshing:true});
    return fetch('http://10.42.0.1:8000/api/categories')
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
      Alert.alert('Info','Gagal Memuat berita');
    })

	}
}
export default Service;