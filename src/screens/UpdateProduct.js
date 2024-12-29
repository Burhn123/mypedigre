import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";  // Your Firebase configuration
import { getAuth } from "firebase/auth"; // Firebase Authentication

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("KATEGORİ");
  const [image, setImage] = useState(null);

  // Fetch products from Firebase Firestore
  const fetchProducts = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userUid = user.uid;
      const q = query(collection(db, "products"), where("userId", "==", userUid));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setProductDescription(product.description);
    setSelectedCategory(product.category);
    setImage(product.imageUri);
  };

  const handleUpdate = async () => {
    if (!productName || !productPrice || !productDescription || !image) {
      Alert.alert("Eksik bilgiler", "Lütfen tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    try {
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, {
        name: productName,
        price: parseFloat(productPrice),
        description: productDescription,
        category: selectedCategory,
        imageUri: image,
      });

      Alert.alert("Başarılı", "Ürün başarıyla güncellendi!");

      // Fetch products again to update the list
      await fetchProducts();

      // Reset form after update
      setSelectedProduct(null);
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setSelectedCategory("KATEGORİ");
      setImage(null);
    } catch (error) {
      Alert.alert("Hata", "Bir hata oluştu: " + error.message);
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Ürün Güncelle</Text>

      {selectedProduct ? (
        <View>
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
          <TouchableOpacity style={styles.categoryButton} onPress={() => {}}>
            <Text style={styles.categoryButtonText}>{selectedCategory}</Text>
          </TouchableOpacity>

          {/* Display current image or allow new image selection */}
          {image && <Image source={{ uri: image }} style={styles.previewImage} />}
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Resim Seç</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
            <Text style={styles.submitButtonText}>Ürünü Güncelle</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.infoText}>Lütfen bir ürün seçin.</Text>
        </View>
      )}

      <Text style={styles.productsHeader}>Mevcut Ürünler</Text>
      {products.length > 0 ? (
        products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productItem}
            onPress={() => handleSelectProduct(product)}
          >
            {/* Display product image if available */}
            {product.imageUri ? (
              <Image source={{ uri: product.imageUri }} style={styles.productImage} />
            ) : null}
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price} TL</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noProductsText}>Henüz ürün eklenmemiş.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff",
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
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: "#6c757d",
  },
  productsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  productItem: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#28a745",
  },
  noProductsText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
});

export default UpdateProduct;
