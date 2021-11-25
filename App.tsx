import React from 'react';
/*
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
*/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MainScreen } from './src/MainScreen';
import { TestScreen } from './src/TestScreen';
import { ComposeScreen } from './src/ComposeScreen';
import { ShowScreen } from './src/ShowScreen';

const Stack = createStackNavigator();

const App = () => {
//console.log('#app');
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              title: "メモ帳-22", // (1)
            }}
          />
          <Stack.Screen
            name="ComposeScreen"
            component={ComposeScreen}
            options={{
              title: "Create",
            }}
          />
          <Stack.Screen
            name="ShowScreen"
            component={ShowScreen}
            options={{
              title: "Show",
            }}
          />
          <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{
              title: "Test",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
