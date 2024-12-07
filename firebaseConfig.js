import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const HomePage = () => {
  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "reactNativeLesson"), {
        title: "Zero to Hero",
        content: "React Native tutorial for beginner",
        lesson: 95,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
      {/* Buton Eklendi */}
      <Button title="Send Data" onPress={sendData} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
