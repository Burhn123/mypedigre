import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

import { collection, addDoc,getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";


const Fotograf = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

    const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

    const takePhoto = async () => {
      if (!hasPermission) {
        alert("Kamera izni gerekli!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         quality: 1, // Başlangıç kalitesi
      });

      if (!result.canceled) {
        const manipResult = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 800, height: 600 } }], // Yeniden boyutlandırma
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Sıkıştırma ve format
          );
          setImageUri(manipResult.uri);
        }
    };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1, // Başlangıç kalitesi
    });

      if (!result.canceled) {
         const manipResult = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 800, height: 600 } }], // Yeniden boyutlandırma
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Sıkıştırma ve format
          );
        setImageUri(manipResult.uri);
      }
    };
  const openImageModal = () => {
    if (imageUri) {
        setIsModalVisible(true);
      } else {
          alert("Önizlenecek bir fotoğraf yok.");
      }
    };

  const closeImageModal = () => {
    setIsModalVisible(false);
  };

    const imageToBase64 = async (uri) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
            return base64;
        } catch (error) {
            console.error('Base64 dönüşümü hatası:', error);
            Alert.alert('Hata', 'Fotoğraf Base64\'e çevrilemedi.');
          throw error;
        }
    };

    const handleSave = async () => {
        if(imageUri){
          try{
            const base64Data = await imageToBase64(imageUri);
            console.log("Base64 verisi:", base64Data.length, "byte");

            const docRef = await addDoc(collection(db, "images"), {
              title: "image",
              content: base64Data,
              lesson: 95
            });
            navigation.navigate('FotografGoster', { base64Data });
            console.log("Document written with ID: ", docRef.id);
          }catch(err){
              console.log("hata çıktı",err);
            }
        }else{
            Alert.alert("Hata","Lütfen önce fotoğraf çekin veya yükleyin");
        }
    };

  return (
        <View style={styles.container}>
          {/* Sol üst butonlar */}
          <View style={styles.leftColumn}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Fotoğraf Çek</Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                  <Text style={styles.buttonText}>Fotoğraf Yükle</Text>
              </TouchableOpacity>
          </View>
            <View>
                <Text style={styles.deneme}>ÜRÜN GİRİNİZ:</Text>
            </View>
          {/* Sağ üst önizleme */}
            <View style={styles.rightColumn}>
              <View style={styles.previewContainer}>
                {imageUri ? (
                  <TouchableOpacity onPress={openImageModal}>
                      <Image source={{ uri: imageUri }} style={styles.preview} />
                  </TouchableOpacity>
                    ) : (
                        <View style={styles.previewPlaceholder}>
                          <Text style={styles.previewText}>Fotoğraf önizlemesi</Text>
                        </View>
                    )}
                </View>
            </View>
          {/* Sağ alt kaydet butonu */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
            {/* Fotoğraf modal */}
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.fullImage} />
            )}
          </View>
          </Modal>
      </View>
  );
};

export default Fotograf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  leftColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  rightColumn: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
    deneme:{
      fontSize: 20,
      fontWeight:"bold",
      textAlign: "center",
  },
  previewContainer: {
    width: 150,
    height: 150,
    borderRadius: 5,
    overflow: 'hidden',
  },
  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  previewPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  saveButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
      position: "absolute",
      top: 20,
      right: 20,
      backgroundColor: "lightgray",
      padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
  fullImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
});