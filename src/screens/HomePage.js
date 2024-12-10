import { StyleSheet,Text,View,Button,Pressable } from "react-native";
import React,{useState} from "react";
import { collection, addDoc,getDocs,doc,deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

// DATA  FIREBASE GÖNDER
const HomePage = () =>{

  const [data, setData] = useState([])

  console.log("data: ", data)

    const sendData =async()=>{
        try {
            const docRef = await addDoc(collection(db, "reactNativeLesson"), {
              title: "Zero to Hero",
              content: "React Native tutorial for beginner",
              lesson: 95
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }


    }


    //GET DATA FROM FIREBASE
    
    const getDate=async()=>{

      const querySnapshot = await getDocs(collection(db, "reactNativeLesson"));
        querySnapshot.forEach((doc) => {
                 //console.log(`${doc.id} => ${doc.data()}`);
           setData( [...data, doc.data() ] )
                 
                 
});

       
        
    }

    //DELETE DATA FROM DATABASE




    return(
        <View style={styles.container}>

          
            <Text style={styles.HosgeldınText}>HOŞGELDİN</Text>
            <Text>{data[0].title}</Text>
            <Text>{data[0].content}</Text>
            <Text>{data[0].lesson}</Text>
            <Text>{data[1].title}</Text>
            <Text>{data[1].content}</Text>
            <Text>{data[1].lesson}</Text>
            

            
            
            
            <Pressable
        onPress={()=>sendData()}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "gray" : "pink" },
          styles.button
        ]}

      >
        <Text style={styles.buttonText}>VERİ KAYIT</Text>
      </Pressable>

      <Pressable
        onPress={() => getDate()}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "gray" : "lightblue" },
          styles.button
        ]}

      >
        <Text style={styles.buttonText}>GET DATA</Text>
      </Pressable>

        </View>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    HosgeldınText:{
      width:10,
      height:500,
      color: "black",
      fontWeight: "bold"
      
      
      
      
    }

   

    
})