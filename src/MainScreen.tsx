import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { List, Button } from "react-native-paper";
//import { useNavigation } from '@react-navigation/native';
//import format from 'date-fns/format'; // (1)
//import { ComposeScreen } from './ComposeScreen';
import config from "../config"

interface IProps {
  navigation: any;
  route: any;
}
interface IState {
  items: any[];
  id: string;
}

export class MainScreen extends React.Component<IProps, IState> {
  focusListerner = null;
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      id: "",
    };
  }
  async componentDidMount(){
    try{
//console.log("#componentDidMount");
      this.getTasks();
      this.focusListerner = this.props.navigation.addListener("focus", async () => {
        await this.getTasks();
      });      
    } catch (e) {
      console.error(e);
    }    
  }
  async getTasks(){
    try{
      const cfg = config.getConfig();
      //console.log("APOLLO_URL=", cfg.APOLLO_URL);
      const site_id = cfg.MY_SITE_ID;
      const url = cfg.API_URL + "/api/get/find?content=tasks&site_id=" +site_id
      const res = await fetch(url);
      const json = await res.json();
//console.log(json);
      this.setState({ items: json });
    } catch (e) {
      console.error(e);
      throw new Error('Error , getTasks');
    }     
  }   
  render() {
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          style={{ marginBottom: 16 }}
          onPress={() => {
            this.props.navigation.navigate("ComposeScreen", {
              id: this.state.id,
            });
          }}
        >
          Test
        </Button>
        <FlatList
          style={styles.list}
          data={this.state.items}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={`作成日時: ${item.created_at}`}
              descriptionStyle={{ textAlign: "right" }}
              onPress={() => {
                this.props.navigation.navigate('ShowScreen', {
                  id: item.id
                });
              }}              
            />
          )}
        />
        {/* TestScreen  FormPickerScreen  ImageScreen FormRadioScreen FormCheckBoxScreen
        this.props.navigation.navigate('ComposeScreen', { */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
