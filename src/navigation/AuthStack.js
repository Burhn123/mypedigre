import { StyleSheet,Text,View } from "react-native";
import React from "react";
import { LoginPage , SignupPage } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () =>{
    return(
        <Stack.Navigator>
            
        </Stack.Navigator>
    )
}

export default AuthStack;

const styles = StyleSheet.create({})