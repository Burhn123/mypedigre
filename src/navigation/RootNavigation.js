import React, { useState } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useColorScheme, View, StyleSheet, ImageBackground } from "react-native";
import { Avatar, Title, Caption, Drawer as PaperDrawer } from 'react-native-paper';
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import { LoginPage, SignupPage, Tanitim, Iletisim, Fotograf, Hakkimizda, Guzergahlar, Market, HomePage, FotografGoster, Fotograf_old } from "../screens";
import Alisveris from "../screens/Alisveris";
import Cikis from "../components/Cikis";
import GuvercinEkle from "../screens/GuvercinEkle";
import KusSecim from "../screens/KusSecim";
import SoyAgaci from "../screens/Soyagaci";
import denemeSoyagaci from "../screens/denemeSoyagaci";
import deneme from "../screens/deneme";
import Chat from "../screens/Chat";
import Vitrin from "../screens/Vitrin";
import UpdateProduct from "../screens/UpdateProduct";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const [isDenemeExpanded, setIsDenemeExpanded] = useState(false);
    const [isGenelExpanded, setIsGenelExpanded] = useState(false);

    const handleDenemePress = () => {
        setIsDenemeExpanded(!isDenemeExpanded);
    };

    const handleGenelPress = () => {
        setIsGenelExpanded(!isGenelExpanded);
    };
    return (
        <DrawerContentScrollView {...props}>
            <ImageBackground 
                source={{uri: 'https://png.pngtree.com/png-clipart/20220404/original/pngtree-vector-bird-logo-design-png-image_7514429.png'}} 
                style={styles.drawerBackground}
                imageStyle={{ resizeMode: 'cover', opacity: 0.1 }}
            >
                <View style={styles.drawerHeader}>
                    <Avatar.Image size={80} source={{ uri: 'https://example.com/avatar.png' }} />
                    <Title style={styles.title}>Hoş Geldiniz</Title>
                    <Caption style={styles.caption}>@kullaniciadi</Caption>
                </View>

                <PaperDrawer.Section>
                    
                    
                    <DrawerItem
                        label="Tanıtım"
                        icon={({ color, size }) => (
                            <Ionicons name="information-circle" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Tanıtım')}
                    />
                    <DrawerItem
                        label="Fotoğraf"
                        icon={({ color, size }) => (
                            <Ionicons name="image" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Fotoğraf')}
                    />
                    <DrawerItem
                        label="Hakkımızda"
                        icon={({ color, size }) => (
                            <Ionicons name="people" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Hakkımızda')}
                    />
                    <DrawerItem
                        label="Güzergahlar"
                        icon={({ color, size }) => (
                            <Ionicons name="map" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Güzergahlar')}
                    />
                    
                    
                    <DrawerItem
                        label="Fotoğraf Göster"
                        icon={({ color, size }) => (
                            <Ionicons name="eye" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Fotoğraf Göster')}
                    />
                    <DrawerItem
                        label="Güvercin Ekle"
                        icon={({ color, size }) => (
                            <Ionicons name="add" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Güvercin Ekle')}
                    />
                    <DrawerItem
                        label="Soy Ağacı"
                        icon={({ color, size }) => (
                            <Ionicons name="git-branch" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Soy Ağacı')}
                    />
                    
                    <DrawerItem
                        label="Chat"
                        icon={({ color, size }) => (
                            <Ionicons name="chatbubbles" size={size} color={color} />
                        )}
                        onPress={() => props.navigation.navigate('Chat')}
                    />

                    
                    {/* deneme Grubu */}
                    <DrawerItem
                        label="deneme"
                        icon={({ color, size }) => (
                            <Ionicons name="code-working" size={size} color={color} />
                        )}
                        onPress={handleDenemePress}
                    />
                    {isDenemeExpanded && (
                        <DrawerItem
                            label="Alışveriş"
                            icon={({ color, size }) => (
                                <Ionicons name="cart" size={size} color={'red'} />
                            )}
                            onPress={() => props.navigation.navigate('Alışveriş')}
                        />
                    )}
                    
                    {isDenemeExpanded && (
                        <DrawerItem
                            label="UpdateProduct"
                            icon={({ color, size }) => (
                                <Ionicons name="cart" size={size} color={'red'} />
                            )}
                            onPress={() => props.navigation.navigate('UpdateProduct')}
                        />
                    )}

                    {isDenemeExpanded && (
                        <DrawerItem
                            label="Vitrin"
                            icon={({ color, size }) => (
                                <Ionicons name="cart" size={size} color={'red'} />
                            )}
                            onPress={() => props.navigation.navigate('Vitrin')}
                        />
                    )}

                    {/* Genel Grubu */}
                    <DrawerItem
                        label="Genel"
                        icon={({ color, size }) => (
                            <Ionicons name="code-working" size={size} color={color} />
                        )}
                        onPress={handleGenelPress}
                        />
                        
                    {isGenelExpanded && (
                        <DrawerItem
                        label="İletişim"
                        icon={({ color, size }) => (
                            <Ionicons name="call" size={size} color={"red"} />
                        )}
                        onPress={() => props.navigation.navigate('Iletisim')}
                    />
                    )}

                        {isGenelExpanded && (
                        <DrawerItem
                            label="Anasayfa"
                            icon={({ color, size }) => (
                                <Ionicons name="home" size={size} color={'red'} />
                            )}
                            onPress={() => props.navigation.navigate('Anasayfa')}
                        />
                    )}




                    
                    
                </PaperDrawer.Section>
            </ImageBackground>
        </DrawerContentScrollView>
    );
};

const RootNavigation = () => {
    const { isAuth } = useSelector((state) => state.user);
    const scheme = useColorScheme();

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            {!isAuth ? (
                <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen 
                        name="Giriş" 
                        component={LoginPage} 
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="log-in" size={size} color={color} />
                            )
                        }}
                    />
                    <Drawer.Screen 
                        name="Kayıt Ol" 
                        component={SignupPage} 
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="person-add" size={size} color={color} />
                            )
                        }}
                    />
                    
                </Drawer.Navigator>
            ) : (
                <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen name="Anasayfa" component={HomePage} />
                    <Drawer.Screen name="İletişim" component={Iletisim} />
                    <Drawer.Screen name="Tanıtım" component={Tanitim} />
                    <Drawer.Screen name="Fotoğraf" component={Fotograf} />
                    <Drawer.Screen name="Hakkımızda" component={Hakkimizda} />
                    <Drawer.Screen name="Güzergahlar" component={Guzergahlar} />
                    <Drawer.Screen name="Alışveriş" component={Alisveris} />
                    <Drawer.Screen name="Fotoğraf Göster" component={FotografGoster} />
                    <Drawer.Screen name="Güvercin Ekle" component={GuvercinEkle} />
                    <Drawer.Screen name="Soy Ağacı" component={denemeSoyagaci} />
                    
                    <Drawer.Screen name="deneme" component={deneme} />
                    <Drawer.Screen name="Chat" component={Chat} />
                    <Drawer.Screen name="Vitrin" component={Vitrin} />
                    <Drawer.Screen name="denemeSoyagaci" component={denemeSoyagaci} />
                    <Drawer.Screen name="UpdateProduct" component={UpdateProduct} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#282c34',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
    },
    caption: {
        color: '#ccc',
        fontSize: 14,
    },
});

export default RootNavigation;
