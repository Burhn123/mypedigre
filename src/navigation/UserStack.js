import React from "react";
import { HomePage,ProfilePage } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const UserStack = () =>{
    return(
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
    )
}

export default UserStack;
