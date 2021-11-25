import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
//import { useNavigation } from '@react-navigation/native';
import config from "../config"

interface IProps {
  navigation: any,
  route: any,
}
interface IState {
  id: string,
  item: any,
}

export  class ShowScreen  extends React.Component<IProps, IState> {
  focusListerner = null
  constructor(props: any) {
    super(props)
//console.log("id=", props.route.params.id);
    this.state = {
      id: props.route.params.id, item: {} 
    };
  }
  async componentDidMount(){
//    console.log("#ShowScreen");
    try{
      this.getTask();
    } catch (e) {
      console.error(e);
    }    
  }
  async getTask(){
    try{
      const cfg = config.getConfig();
//console.log(data.data.task);
      const url = cfg.API_URL +"/api/get/findone?content=tasks&id=" + this.state.id
      const res = await fetch(url);    
      const json = await res.json();
// console.log(json);
      this.setState({ item: json });
    } catch (e) {
      console.error(e);
      throw new Error('Error , getTask');
    }
  }  
  async onPressDelete(){
    try{
      const cfg = config.getConfig();
      const item = {
        id: this.state.id,
      }
//console.log(item)
      const res = await fetch(cfg.API_URL + '/api/post/delete/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': cfg.MY_API_KEY },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        this.props.navigation.goBack();
      } else {
        throw new Error(await res.text());
      }      
// console.log("#onPressDelete");
    } catch (e) {
      console.error(e);
    }
  }  
  render(){
console.log(this.state.item );
    return (
      <View style={styles.container}>
        <Text>Welcome, Show</Text>
        <Text>id: {this.state.id}</Text>
        <Text style={{ marginBottom: 16 }}
        >title: {this.state.item.title}</Text>
        <Button
        mode="contained"
        style={{ marginBottom: 16 }}
        onPress={() => {
          this.props.navigation.navigate('EditScreen', {
            id: this.state.id
          });
        }}        
        >Edit
        </Button>        
        <Button
        mode="contained"
        onPress={() => this.onPressDelete()}
        >削除
        </Button>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

