import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextInput} from 'react-native';
import { Button } from 'react-native-paper';
//import { useNavigation } from '@react-navigation/native';
import config from "../config"

interface IProps {
  navigation: any,
  route: any,
}
interface IState {
  id: string,
  title: string,
  item: any,
}

export class EditScreen extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      title: "", id: props.route.params.id, item: {} 
    };
  }
  async componentDidMount(){
    console.log("#ShowScreen");
    try{
      const cfg = config.getConfig();
      const url = cfg.API_URL +"/api/get/findone?content=tasks&id=" + this.state.id
      const res = await fetch(url);    
      const json = await res.json();
//console.log(json);
      this.setState({
        item: json, title: json.title
      });
    } catch (e) {
      console.error(e);
    }    
  }  
  async onPressSave(){
    try{
//console.log(result);
      const cfg = config.getConfig();
      const api_key = cfg.MY_API_KEY;
      const item = {
        id: this.state.id,
        title: this.state.title,  
        content: "",
      };
      const response = await fetch(cfg.API_URL + '/api/post/update/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 'apikey': api_key
        },
        body: JSON.stringify(item),
      });
      if (response.status === 200) {
//        res.json(data)
        this.props.navigation.goBack();
      } else {
        throw new Error(await response.text());
      }
    } catch (e) {
      console.error(e);
      throw new Error('Error , onPressSave');
    }
  }
  inputValueUpdate = (val :any, prop: any) => {
//console.log(prop);
    if(prop === 'title'){
      this.setState({ title: val });
    }
  }
  render(){
console.log(this.state.item);
    return (
      <KeyboardAvoidingView
        style={styles.container}
      >
        <TextInput
          style={{ marginBottom: 16 }}
          placeholder="文字を入力してください"
          value={this.state.title}
          onChangeText={(val) => this.inputValueUpdate(val, 'title')}
        />
        <Button
          mode="contained"
          onPress={() => this.onPressSave()}
        >保存
        </Button>
      </KeyboardAvoidingView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

