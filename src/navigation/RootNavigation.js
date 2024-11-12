import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer"; // yeni ekledim
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

import { LoginPage , SignupPage , Tanitim , Iletisim  } from "../screens";
const Drawer = createDrawerNavigator(); // yeni ekledim
// <AuthStack/> // asagıdaydı yularıya tasidim

const RootNavigation = () =>{

    const isAuth = false;

    return(
      <NavigationContainer>
        {
            !isAuth 
            ? <Drawer.Navigator >
            <Drawer.Screen name="Giris" component={LoginPage} />
            <Drawer.Screen name="kayitOl" component={SignupPage} />
            <Drawer.Screen name="Iletisim" component={Iletisim} />
            <Drawer.Screen name="Tanitim" component={Tanitim} />
          </Drawer.Navigator>
          
            : <UserStack/>
        }

      </NavigationContainer>
    )
}

export default RootNavigation;
