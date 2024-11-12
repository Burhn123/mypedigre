import React from "react";
import { LoginPage , SignupPage , Tanitim , Iletisim } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';
import { Settings } from "react-native";


import { createDrawerNavigator } from "@react-navigation/drawer";


const Stack = createStackNavigator();

const AuthStack = () =>{
    return(
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{headerShown:false}} >
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="Tanitim" component={Tanitim} />
            <Stack.Screen name="Iletisim" component={Iletisim} />
            
        </Stack.Navigator>

    

    )
}

export default AuthStack;

