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

const GuvercinEkle = () => {
  const [productKunyeNo, setProductKunyeNo] = useState(""); //kunye no
  const [productGuvercinAdi, setProductGuvercinAdi] = useState(""); //Güvercin adı
  const [productSahibi, setProductSahibi] = useState("");     //Sahibi
  const [productKanHatti, setProducKanHatti] = useState(""); //Kan Hatti
  const [productRenk, setProducRenk] = useState(""); //Renk
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("DURUM");
  const [selectedCinsiyet, setSelectedCinsiyet] = useState("Cinsiyet");
  const [selectedBaba, setSelectedBaba] = useState("Baba");
  const [selectedAnne, setSelectedAnne] = useState("Anne");
  const [istek, setSelectedIstek] = useState([]);

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = ["Arşiv", "Damızlık", "Yarışçı", "Kümesim"];
  const cinsiyet =["Erkek","Dişi"]

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
    if (!productKunyeNo || !productSahibi || !productDescription || !image) {
      Alert.alert(
        "Eksik bilgiler",
        "Lütfen tüm alanları doldurduğunuzdan emin olun."
      );
      return;
    }

    Alert.alert("Başarılı", "Ürün başarıyla eklendi!");
    setProductKunyeNo("");
    setProductSahibi("");
    setProductGuvercinAdi("");  
    setProductKanHatti("");
    setProductRenk("");
    setProductDescription("");
    setSelectedCategory("KATEGORİ");
    setSelectedCinsiyet("CİNSİYET");
    setSelectedBaba("Baba");
    setSelectedAnne("Anne");
    
    setImage(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedCinsiyet(cinsiyet);
    setSelectedAnne(anne);
    setSelectedBaba(baba);
    setModalVisible(false);
  };
  
  const showModal = (props)=>{
    if(props =="category")
    {
        setSelectedIstek(categories);
    }
    else if(props =="cinsiyet")
    {
        setSelectedIstek(cinsiyet);
    }
    else 
    {
        setSelectedIstek([]);
    }


    setModalVisible(true);


  }

  return (
    <ScrollView>
      <View><Text style={styles.header}>Ürün Ekle</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Künye No"
        value={productKunyeNo}
        onChangeText={setProductKunyeNo}
      />

      <TextInput
        style={styles.input}
        placeholder="Sahibi"
        value={productSahibi}
        onChangeText={setProductSahibi}
        keyboardType="numeric"
      />

        <TextInput
        style={styles.input}
        placeholder="Guvercin Adı"
        value={productGuvercinAdi}
        onChangeText={setProductGuvercinAdi}
        keyboardType="numeric"
      />    
      <TextInput
        style={styles.input}
        placeholder="Kan Hatti"
        value={productKanHatti}
        onChangeText={setProducKanHatti}
        keyboardType="numeric"
      />    
      <TextInput
        style={styles.input}
        placeholder="Renk"
        value={productRenk}
        onChangeText={setProducRenk}
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
       // onPress={() => setModalVisible(true)}
       onPress={() => showModal("category")}
      >
        <Text style={styles.categoryButtonText}>{selectedCategory}</Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.CinsiyetButton}
       // onPress={() => setModalVisible(true)}
       onPress={() => showModal("cinsiyet")}
      >
        <Text style={styles.categoryButtonText}>{selectedCinsiyet}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.anneButton}
       // onPress={() => setModalVisible(true)}
       onPress={() => showModal("")}
      >
        <Text style={styles.categoryButtonText}>{selectedAnne}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.babaButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.categoryButtonText}>{selectedBaba}</Text>
      </TouchableOpacity>

      

      

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/*
            categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.modalOptionText}>{category}</Text>
              </TouchableOpacity>


            )) */}
              {
                 istek.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.modalOptionText}>{category}</Text>
              </TouchableOpacity>


            )) }
            
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
    height: 50,
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
    CinsiyetButton: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ccc",
  },
  anneButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
},
babaButton: {
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

export default GuvercinEkle;
