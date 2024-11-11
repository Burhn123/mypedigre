import { StyleSheet,Text,View ,ActivityIndicator, Pressable} from "react-native";
import React from "react";

const Loading =({name,changeIsLoading}) => {

    return (

        <View style={styles.container}>
            <Pressable
            onPress={()=>changeIsLoading()} 
            style={[{},styles.closeButtonContainer]}>
            <Text style={styles.closeButon}>X</Text>

            </Pressable>
            
            <ActivityIndicator size={'large'} color={'blue'} />
            <Text style={styles.loginText}>{name} Loading...</Text>
            </View>
    )
}

export default Loading

const styles=StyleSheet.create({
container:{
    width:'100%',
    height:'100%',
    position:'absolute',
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
},
loginText:{
    fontWeight:'bold',
    fontSize:16,
    color:'white',
    marginTop:20

},

closeButtonContainer:{
    backgroundColor:'black',
    width:50,
    height:50,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:50,
    right:30
},
closeButon: {
    color:'white',
    fontWeight:'bold',
    fontSize:16, 
}
})
