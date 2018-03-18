/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Button
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import HTMLView from 'react-native-htmlview';
class DetailScreen extends Component {
    static navigationOptions = {  title: "Home",header:null };
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state =  {

      refreshing: false,
      params : params ? params.slug : null
    };
  }


  componentDidMount(){
    this.fetch();
  }
  
  fetch(){
    const id = this.state.params;
    this.setState({refreshing:true});
    return fetch('http://10.42.0.1:8000/api/articles/'+id)
    .then((response)=>response.json())
    .then((responseJson)=>{
      // Alert.alert('info',JSON.stringify(responseJson.data));
      var headerTitle = responseJson.data[0].title;
      var max = 20;


//trim the string to the maximum length
var trimmedString = headerTitle.substr(0, max);

//re-trim if we are in the middle of a word
trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

      this.setState({
        refreshing:false,
        picture: 'http://10.42.0.1:8000/uploads/'+responseJson.data[0].photo,
        article: responseJson.data[0].content,
        title: responseJson.data[0].title,
        titleHeader: trimmedString+'...'
      },function(){

      });
    })
    .catch((err)=>{
      console.error(err);
    })

  }


  render() {
    const { onScroll = () => {} } = this.props;

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


 <ParallaxScrollView

            headerBackgroundColor="#333"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}

            renderBackground={() => (
              <View key="background">

                <Image source={{uri: this.state.picture,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: 'rgba(0,0,0,.4)',
                              height: PARALLAX_HEADER_HEIGHT}}/>
              </View>
            )}

            renderForeground={() => (

              <View key="parallax-header" style={ styles.parallaxHeader }>
                <Text style={ styles.sectionSpeakerText }>
                  {this.state.title}
                </Text>

              </View>

            )}

            renderStickyHeader={() => (


              <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{this.state.titleHeader}</Text>
              </View>
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>


                <Icon.Button name="ios-arrow-back-outline" 
  style={{width:40,height:20,marginTop:10}}
backgroundColor='transparent'
onPress = {()=>{this.props.navigation.goBack()}}
  >
  </Icon.Button>

              </View>

            )}
>
<View>
<HTMLView value={this.state.article}          
/>
</View>
                </ParallaxScrollView>



    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    left: 40
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default DetailScreen;