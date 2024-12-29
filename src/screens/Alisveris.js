import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth"; // Firebase Authentication

const Alisveris = () => {
  const [productName, setProductName] = useState("");
  const [userId, setUserId] = useState(null);
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("KATEGORİ");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");  // New state for first name
  const [lastName, setLastName] = useState("");    // New state for last name
  const [phone, setPhone] = useState("");          // New state for phone number

  const categories = ["Elektronik", "Giyim", "Yiyecek", "Ev Eşyaları"];

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("Resim seçimi iptal edildi");
    }
  };

  const handleSubmit = () => {
    if (!productName || !productPrice || !productDescription || !image || !firstName || !lastName || !phone) {
      Alert.alert(
        "Eksik bilgiler",
        "Lütfen tüm alanları doldurduğunuzdan emin olun."
      );
      return;
    }

    addDoc(collection(db, "products"), {
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      category: selectedCategory,
      imageUri: image,
      userId: userId,
      firstName: firstName,    // Save first name
      lastName: lastName,      // Save last name
      phone: phone,            // Save phone number
    })
      .then((docRef) => {
        Alert.alert("Başarılı", "Ürün başarıyla eklendi! ID: " + docRef.id);
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setSelectedCategory("KATEGORİ");
        setImage(null);
        setFirstName("");       // Clear first name
        setLastName("");        // Clear last name
        setPhone("");           // Clear phone
      })
      .catch((error) => {
        Alert.alert("Hata", "Bir hata oluştu: " + error.message);
      });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.pixabay.com/photo/2023/03/15/20/46/background-7855413_1280.jpg",
      }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.header}>Ürün Ekle</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Ürün Adı"
          value={productName}
          onChangeText={setProductName}
          placeholderTextColor="#6c757d"
        />

        <TextInput
          style={styles.input}
          placeholder="Ürün Fiyatı"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
          placeholderTextColor="#6c757d"
        />

        <TextInput
          style={styles.textArea}
          placeholder="Ürün Açıklaması"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor="#6c757d"
        />

        <TextInput
          style={styles.input}
          placeholder="Adınız"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#6c757d"
        />

        <TextInput
          style={styles.input}
          placeholder="Soyadınız"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#6c757d"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefon Numaranız"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#6c757d"
        />

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.categoryButtonText}>{selectedCategory}</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.modalOption}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.modalOptionText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <View style={styles.imagePickerContainerTopRight}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <MaterialIcons name="photo-library" size={15} color="white" />
            <Text style={styles.imageButtonText}>Resim Seç</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewCard}>
          {image && <Image source={{ uri: image }} style={styles.previewImage} />}
          <View style={styles.previewTextContainer}>
            <Text style={styles.previewTitle}>{productName || "Ürün Adı"}</Text>
            <Text style={styles.previewPrice}>{productPrice || "0.00"} TL</Text>
            <Text style={styles.previewDescription}>{productDescription || "Ürün açıklaması burada görünecek."}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Ürünü Ekle</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#343a40",
  },
  input: {
    height: 50,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontSize: 16,
    color: "#495057",
  },
  textArea: {
    height: 120,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 10,
    marginBottom: 15,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontSize: 16,
    color: "#495057",
  },
  categoryButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  imagePickerContainerTopRight: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  previewTextContainer: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  previewPrice: {
    fontSize: 16,
    color: "#28a745",
    marginBottom: 5,
  },
  previewDescription: {
    fontSize: 14,
    color: "#6c757d",
  },
  imageButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  imageButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Alisveris;
