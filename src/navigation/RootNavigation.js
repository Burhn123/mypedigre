import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer"; // yeni ekledim
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import app from '../../firebaseConfig';
import { useSelector } from "react-redux";


 
//import { LoginPage , SignupPage , Tanitim , Iletisim , Fotograf, Hakkimizda,Guzergahlar,Market} from "../screens";
import { LoginPage , SignupPage , Tanitim , Iletisim , Fotograf, Hakkimizda,Guzergahlar,Market,
   HomePage,FotografGoster,Fotograf_old} from "../screens";
import Alisveris from "../screens/Alisveris";
import Cikis from "../components/Cikis";

const Drawer = createDrawerNavigator(); // yeni ekledim
// <AuthStack/> // asagıdaydı yularıya tasidim

const RootNavigation = () =>{

    const {isAuth} = useSelector((state)=>state.user);

    return(
      <NavigationContainer>
        {
            !isAuth 
            ? <Drawer.Navigator >
            <Drawer.Screen name="Giris" component={LoginPage} />
            <Drawer.Screen name="kayitOl" component={SignupPage} />
            <Drawer.Screen name="Iletisim" component={Iletisim} />
          </Drawer.Navigator>
            : <Drawer.Navigator >
            <Drawer.Screen name="Anasayfa" component={HomePage} />
            <Drawer.Screen name="Iletisim" component={Iletisim} />
            <Drawer.Screen name="Tanitim" component={Tanitim} />
            <Drawer.Screen name="Fotograf" component={Fotograf} />
            <Drawer.Screen name="Hakkimizda" component={Hakkimizda} />
            <Drawer.Screen name="Guzergahlar" component={Guzergahlar} />
            <Drawer.Screen name="Alisveris" component={Alisveris} />
            <Drawer.Screen name="kayitOl" component={SignupPage} />
            <Drawer.Screen name="FotografGoster" component={FotografGoster} options={{ headerTitle: () => <Cikis title="Fotoğraf Göster" /> }} />
            <Drawer.Screen name="FotografOld" component={Fotograf_old} />
          </Drawer.Navigator>
        }
      </NavigationContainer>
    )
}

export default RootNavigation;
