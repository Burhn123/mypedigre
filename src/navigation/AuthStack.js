import React from "react";
import { LoginPage , SignupPage , Tanitim } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () =>{
    return(
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{headerShown:false}} >
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="Tanitim" component={Tanitim} />
        </Stack.Navigator>
    )
}

export default AuthStack;

