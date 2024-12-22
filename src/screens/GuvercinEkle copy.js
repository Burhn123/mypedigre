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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const GuvercinEkle = () => {
  const [productKunyeNo, setProductKunyeNo] = useState("");
  const [productGuvercinAdi, setProductGuvercinAdi] = useState("");
  const [productSahibi, setProductSahibi] = useState("");
  const [productKanHatti, setProducKanHatti] = useState("");
  const [productRenk, setProducRenk] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCinsiyet, setSelectedCinsiyet] = useState();
  const [selectedBaba, setSelectedBaba] = useState();
  const [selectedAnne, setSelectedAnne] = useState();
  const [istek, setSelectedIstek] = useState([]);
  const [istekYeri, setSelectedIstekYeri] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [femaleBird, setFemaleBird] = useState([]);
  const [maleBird, setMaleBird] = useState([]);
  const cinsiyet = ["Erkek", "Dişi"];
  const anne = ["anne"];
  const baba = ["baba"];

    useEffect(() => {
      fetchCategories();
      fetchFemaleBird();
      fetchMaleBird();
    }, []);
    useEffect(()=>{
      setSelectedCategory("Seçiniz");
      setSelectedCinsiyet("Seçiniz");
      setSelectedBaba("Seçiniz");
      setSelectedAnne("Seçiniz");
    },[])

    const fetchCategories = async () => {
        try {
            const categoriesRef = collection(db, "categories");
             const querySnapshot = await getDocs(categoriesRef);
             //console.log("querySnapshot",doc.data())
             const categories = querySnapshot.docs.map((doc) => doc.data().name); // Sadece isimleri alıyoruz
            
            setCategories(categories);
           //console.log("categories",categories);
        } catch (error) {
           console.error("Kategoriler çekilirken hata oluştu:", error);
        }
    };
    const fetchFemaleBird = async () => {
      try {
          const female_birdRef = collection(db, "female_bird");
           const querySnapshot = await getDocs(female_birdRef);
           //console.log("querySnapshot",doc.data())
           const female_bird = querySnapshot.docs.map((doc) => doc.data().kunye_no); // Sadece isimleri alıyoruz
          
          setFemaleBird(female_bird);
         console.log("categories",categories);
      } catch (error) {
         console.error("Kategoriler çekilirken hata oluştu:", error);
      }
  };
  const fetchMaleBird = async () => {
    try {
        const male_birdRef = collection(db, "male_bird");
         const querySnapshot = await getDocs(male_birdRef);
         //console.log("querySnapshot",doc.data())
         const male_bird = querySnapshot.docs.map((doc) => doc.data().kunye_no); // Sadece isimleri alıyoruz
        
        setMaleBird(male_bird);
       console.log("categories",categories);
    } catch (error) {
       console.error("Kategoriler çekilirken hata oluştu:", error);
    }
};

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
    setProducKanHatti("");
    setProducRenk("");
    setProductDescription("");
    setSelectedCategory("KATEGORİ");
    setSelectedCinsiyet("CİNSİYET");
    setSelectedBaba("Baba");
    setSelectedAnne("Anne");
    setImage(null);
  };

  const handleCategorySelect = (category,istekYeri) => {
    console.log("category",category);
    if(istekYeri=="category")
    {
      setSelectedCategory(category);
    }
    else if(istekYeri =="cinsiyet")
    {
      setSelectedCinsiyet(category);
    }
    else if(istekYeri=="anne_adi")
    {
      setSelectedAnne(category);
    }
    else if(istekYeri=="baba_adi")
    {
      setSelectedBaba(category)
    }
    else 
    {}
   // setSelectedCategory(category);
  //  setSelectedCinsiyet(cinsiyet);
   // setSelectedAnne(anne);
   // setSelectedBaba(baba);
   // setModalVisible(false);
   setModalVisible(false);
  };

 const showModal = (props)=>{
      if(props =="category")
        {
           setSelectedIstekYeri("category");
           setSelectedIstek(categories);
       }
      else if(props =="cinsiyet")
      {
          setSelectedIstekYeri("cinsiyet");
           setSelectedIstek(cinsiyet);
      }
      else if(props=="anne_adi")
      {
        setSelectedIstekYeri("anne_adi");
        setSelectedIstek(femaleBird);
      }
      else if(props=="baba_adi")
      {
        setSelectedIstekYeri("baba_adi");
        setSelectedIstek(maleBird);
      }
      else
      {
        setSelectedIstekYeri("");
        setSelectedIstek([]);
      }

        setModalVisible(true);
   }

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Ürün Ekle</Text>
      </View>
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
       <Text >Kategori Seç</Text>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => showModal("category")}
      >
        <Text style={styles.categoryButtonText}>{selectedCategory}</Text>
      </TouchableOpacity>
      <Text>Cinsiyet Seç</Text>
      <TouchableOpacity
        style={styles.CinsiyetButton}
        onPress={() => showModal("cinsiyet")}
      >
        <Text style={styles.categoryButtonText}>{selectedCinsiyet}</Text>
      </TouchableOpacity>
      <Text>Anne Seç</Text>
      <TouchableOpacity
        style={styles.anneButton}
        onPress={() => showModal("anne_adi")}
      >
        <Text style={styles.categoryButtonText}>{selectedAnne}</Text>
      </TouchableOpacity>
      <Text>Baba Seç</Text>
      <TouchableOpacity
        style={styles.babaButton}
        //onPress={() => setModalVisible(true)}
        onPress={() => showModal("baba_adi")}
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
            {istek.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.modalOption}
                //onPress={() => handleCategorySelect(category)}
                onPress={() => handleCategorySelect(category,istekYeri)}
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
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
       textAlign:"center"
    },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlignVertical: "top",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
     alignItems: "center"
  },
    CinsiyetButton: {
      backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20,
        alignItems: "center"
    },
    anneButton: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20,
        alignItems: "center"
    },
    babaButton: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20,
        alignItems: "center"
    },
    categoryButtonText: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
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
    borderRadius: 10,
    width: "80%",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  imagePickerContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
      alignItems: 'center'
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 5,
      marginLeft: 10
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
      textAlign:"center"
  },
});
export default GuvercinEkle;