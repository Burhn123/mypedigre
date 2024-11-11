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
>>>>>>> 9234c9ef55b84c9c6ba263e6fd5a316f7143bfef


const App = () => {
  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name='LoginPage' component={LoginPage} />
        <Stack.Screen name='SignupPage' component={SignupPage} />
        <Stack.Screen name='Tanitim' component={Tanitim} />      
      </Stack.Navigator>
    </NavigationContainer>
=======
   <RootNavigation/>
>>>>>>> 9234c9ef55b84c9c6ba263e6fd5a316f7143bfef
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








    
