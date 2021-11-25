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
  title: string
}

export class ComposeScreen extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = { title: "" };
  }
  async onPressSave(){
    try{
console.log("#onPressSave");
      const cfg = config.getConfig();
      const item = {
        title: this.state.title,
        content: "",
      }
      const api_key = cfg.MY_API_KEY;
      const res = await fetch(cfg.API_URL + '/api/post/create/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': api_key},
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        this.props.navigation.goBack();
      } else {
        throw new Error(await res.text());
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
        >
          保存
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

