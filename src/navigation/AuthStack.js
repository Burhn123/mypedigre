import React from "react";
import { LoginPage , SignupPage , Tanitim , Iletisim  } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = () =>{
    return(
    
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{headerShown:false}} >
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
        </Stack.Navigator>
    )
} 

export default AuthStack;

