import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  AsyncStorage ,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import config from "../config"

//
interface IProps {
  navigation: any;
  route: any;
}
interface IState {
  id: string;
  item: any;
  items: any[];
}

export class TestScreen extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
console.log("#TestScreen");
console.log(props);
    this.state = {
      id: props.route.params.id,
      item: {},
      items: [],
    };
  }
  async componentDidMount(){
    try{
console.log("#componentDidMount");
      const cfg = config.getConfig();
//console.log("APOLLO_URL=", cfg.APOLLO_URL);
      const site_id = cfg.MY_SITE_ID;
      const url = cfg.API_URL +"/api/get/find?content=tasks&site_id=" +site_id
      const res = await fetch(url);    
      const json = await res.json();
console.log(json);
//      this.setState({ items: data.data.tasks }); 
    } catch (e) {
      console.error(e);
    }    
  }  
  render(){
    //console.log("id=", this.state.id );
    return (
      <View style={styles.container}>
        <Text style={[styles.text_base, styles.text_top]}>Welcome, Test</Text>
        <Text style={[styles.text_base, { marginBottom: 0 }]}>img1:</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  text_base: {
    fontSize: 24,
  },
  text_top: {
    color: '#00FF00',
    fontSize: 24,
  },
});
