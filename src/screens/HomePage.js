import { StyleSheet,Text,View,Button,Pressable } from "react-native";
import React,{useState} from "react";
import { collection, addDoc,getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore"; 
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
    const deleteData=async()=>{
      await deleteDoc(doc(db,"reactNativeLesson","MumUEl54dzPXCzK1Gtb2"));

    }


    //Update Data From Databse

    const updateData =async()=>{
  
      try {
      const lessonData = doc(db, "reactNativeLesson", "1sMxo5OYujZ9FTPwLKTX");

// Set the "capital" field of the city 'DC'
        await updateDoc(lessonData, {
         lesson:145

});

      } catch (error) {
        console.log(error)
        
      }

    }



    return(
        <View style={styles.container}>

          
            <Text style={styles.HosgeldınText}>HOŞGELDİN</Text>
            <Text>{data[0]?.title}</Text>
            <Text>{data[0]?.content}</Text>
            <Text>{data[0]?.lesson}</Text>
            <Text>{data[1]?.title}</Text>
            <Text>{data[1]?.content}</Text>
            <Text>{data[1]?.lesson}</Text>


            

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


      <Pressable
        onPress={() => deleteData()}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "gray" : "#A16BAA" },
          styles.button
        ]}

      >
        <Text style={styles.buttonText}>DELETE DATA</Text>
      </Pressable>

      <Pressable
        onPress={()=>updateData()}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "gray" : "#1DD3B0" },
          styles.button
        ]}

      >
        <Text style={styles.buttonText}>Güncelleme</Text>
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
      height:450,
      color: "black",
      fontWeight: "bold"
      
      
      
      
    }

   

    
})