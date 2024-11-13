import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const Fotograf = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // Kamera izni kontrolü
  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  // Fotoğraf çekme işlemi
  const takePhoto = async () => {
    if (!hasPermission) {
      alert("Kamera izni gerekli!");
      return;
    }

    // Kamera çekimi yerine ImagePicker kullanılıyor
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // URI'yi doğru şekilde alıyoruz
    }
  };

  // Galeriden fotoğraf yükleme işlemi
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // URI'yi doğru şekilde alıyoruz
    }
  };

  // Modal gösterim fonksiyonu
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
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>

      {/* Fotoğraf modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
          >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftColumn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 25,
    marginBottom: 35,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rightColumn: {
    position: "absolute",
    top: 20,
    right: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  previewContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  previewPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  previewText: {
    fontSize: 16,
    color: "#888",
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
  },
  fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default Fotograf;
