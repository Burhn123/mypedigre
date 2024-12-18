import { StyleSheet,Text,View,Button,Pressable, Alert } from "react-native";
import React,{useState,useEffect} from "react";
import { collection, addDoc,getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";
import { useSelector , useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice";


const HomePage = () =>{
  const [data, setData] = useState([])
  const dispatch = useDispatch();

  const { error } = useSelector((state)=>state.user);
  console.log("data: ", data)

  useEffect(() => {
    Alert.alert(error);
}, [error]);
//uygulama açıldığı gibi verileri akltarma 
  useEffect(() => {
    getDate()
  }, [])


// kullanici cikis islemleri
const onPressCikis = () =>{
 // console.log("home girdi")
  dispatch(logout())
}
  // DATA  FIREBASE GÖNDER
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
      const allDAta=[]
      try {
        const querySnapshot = await getDocs(collection(db, "reactNativeLesson"));
        querySnapshot.forEach((doc) => {
                 //console.log(`${doc.id} => ${doc.data()}`);
           allDAta.push({...doc.data(),id:doc.id})         
});
      setData (allDAta) 
      } catch (error) {
        console.log(error)
      }
    }
    //DELETE DATA FROM DATABASE
    const deleteData=async(value)=>{
      try {
        await deleteDoc(doc(db,"reactNativeLesson",value));
        console.log("SILME BASARILI")
      } catch (error) {
        console.log(error)
      }
    }

    //Update Data From Databse
    const updateData =async(value)=>{
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
            {data.map((value,index)=>{
              return(
                <Pressable
                onPress={()=>deleteData(value.id)}
                 key={index}>
                <Text>{index}</Text>
                <Text>{value.id}</Text>       
                <Text>{value.title}</Text>
                <Text>{value.content}</Text>
                <Text>{value.lesson}</Text>
                </Pressable>
              )
            }
            )}
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
        <View style={styles.cikisButton}>
            <Button
                onPress={()=>onPressCikis()}
                title="çıkış"
                color="red"
                //accessibilityLabel="Learn more about this purple button"
                />
        </View>
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
      height:100,
      color: "black",
      fontWeight: "bold"
      
      
      
      
    }

   

    
})