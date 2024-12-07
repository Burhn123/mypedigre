import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import LoginPage from './src/screens/LoginPage_prg';
import SignupPage from './src/screens/SignupPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tanitim  from './src/screens/Tanitim'; //DENEME TANITIM SAYFASI

import { createDrawerNavigator } from "@react-navigation/drawer"; // yeni ekledim

import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux'; // 6.12.2024 
import { store } from './src/redux/store'; // 6.12.2024

// yeni eklendi
// const Drawer = createDrawerNavigator();

// provider yeni eklendi 3.12.2024
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
};

export default App;


/*
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginPage from './src/screens/LoginPage'
import SignupPage from './src/screens/SignupPage'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage}/>
        <Stack.Screen name='SignupPage' component={SignupPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default App

const styles = StyleSheet.create({})

*/








    
