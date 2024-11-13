import React, { useState } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const Alisveris = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("KATEGORİ");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = ["Elektronik", "Giyim", "Yiyecek", "Ev Eşyaları"];

  // Resim yükleme fonksiyonu
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

  // Form gönderme fonksiyonu
  const handleSubmit = () => {
    if (!productName || !productPrice || !productDescription || !image) {
      Alert.alert(
        "Eksik bilgiler",
        "Lütfen tüm alanları doldurduğunuzdan emin olun."
      );
      return;
    }

    Alert.alert("Başarılı", "Ürün başarıyla eklendi!");
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setSelectedCategory("KATEGORİ");
    setImage(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Ürün Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Ürün Adı"
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        style={styles.input}
        placeholder="Ürün Fiyatı"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.textArea}
        placeholder="Ürün Açıklaması"
        value={productDescription}
        onChangeText={setProductDescription}
        multiline
        numberOfLines={4}
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

      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Resim Seç</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ürünü Ekle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#388E3C",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Alisveris;
