import React from "react";
import { LoginPage , SignupPage , Tanitim , Iletisim  } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';
import { Settings } from "react-native";


import { createDrawerNavigator } from "@react-navigation/drawer";



const AuthStack = () =>{
    return(
    
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{headerShown:false}} >
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
<<<<<<< HEAD
            <Stack.Screen name="Tanitim" component={Tanitim} />
            <Stack.Screen name="Iletisim" component={Iletisim} />
            
=======
>>>>>>> 91d0a377dc8966244cc54ec91661c46543bf2c97
        </Stack.Navigator>

    

    )
}

export default AuthStack;

