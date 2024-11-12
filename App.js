import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
<<<<<<< HEAD
import LoginPage from './src/screens/LoginPage';
import SignupPage from './src/screens/SignupPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tanitim  from './src/screens/Tanitim'; //DENEME TANITIM SAYFASI

=======
import RootNavigation from './src/navigation/RootNavigation';
>>>>>>> 69a81616da90b1f1b697865794d7708d760d6c93


const App = () => {
  return (
   <RootNavigation/>
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








    
