import React from 'react';
import { View, Text, Button,TouchableOpacity, StyleSheet } from 'react-native';
import { db } from "../../firebaseConfig";
import { useSelector , useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice";

const Cikis = ({ title }) => {
const dispatch = useDispatch();

// kullanici cikis islemleri
const onPressCikis = () =>{
    // console.log("home girdi")
     dispatch(logout())
   }
    
        return (
        <View style={styles.container} >
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.buttonContainer}>
            <Button
                onPress={()=>onPressCikis()}
                title="çıkış"
                color="white"
                />
             </View>
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        container:{
            flex:1
        }, 
        buttonContainer: {
            backgroundColor:"red",
            color:"white",
            position: 'absolute',
            top: 10,
            right: -150,
            borderRadius: 5,
        },
        titleText:{ 
            color: "black",
            fontWeight: "bold",
        },
    });
    
    export default Cikis;