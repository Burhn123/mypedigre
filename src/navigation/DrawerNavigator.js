import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Tanitim } from "../screens";




const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Haber" component={Tanitim} />
      
    
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
