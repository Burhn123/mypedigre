import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Picker } from '@react-native-picker/picker';

const Vitrin = () => {
  const [products, setProducts] = useState([]); // Tüm ürünleri saklamak için durum
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtrelenmiş ürünler
  const [selectedCategory, setSelectedCategory] = useState('All'); // Seçilen kategori
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü
  const [selectedSeller, setSelectedSeller] = useState(null); // Seçilen satıcı
  const [imageModalVisible, setImageModalVisible] = useState(false); // Fotoğraf Modal Görünürlüğü
  const [selectedImageUri, setSelectedImageUri] = useState(null); // Seçilen fotoğraf URI'si

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const productsList = await getDocs(productsRef);
      const allProducts = [];
      productsList.forEach((doc) => {
        allProducts.push(doc.data());
      });

      setProducts(allProducts);
      setFilteredProducts(allProducts); // Başlangıçta tüm ürünleri göster
      console.log('allProduct', allProducts);
    } catch (error) {
      console.log('Product çekilirken hata çıktı', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products); // Tüm ürünleri göster
    } else {
      const filtered = products.filter((item) => item.category === category);
      setFilteredProducts(filtered); // Seçilen kategoriye ait ürünleri göster
    }
  };

  const handleShowSellerInfo = (seller) => {
    setSelectedSeller(seller); // Satıcı bilgilerini seç
    setModalVisible(true); // Modalı göster
  };

  const handleImagePress = (imageUri) => {
    setSelectedImageUri(imageUri); // Seçilen fotoğraf URI'sini ayarla
    setImageModalVisible(true); // Fotoğraf modalını göster
  };

  const handleRefresh = () => {
    fetchProducts(); // Yeni ürünleri al ve listeyi güncelle
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vitrin</Text>

      {/* Sağ üstte yenileme butonu */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Yenile</Text>
      </TouchableOpacity>

      {/* Kategori Seçimi */}
      <View style={styles.categorySelector}>
        <Text style={styles.categoryLabel}>Kategori Seç:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={handleCategoryChange}
          style={styles.picker}
        >
          <Picker.Item label="Tümü" value="All" />
          <Picker.Item label="Elektronik" value="Elektronik" />
          <Picker.Item label="Moda" value="Moda" />
          <Picker.Item label="Ev Eşyaları" value="Ev Eşyaları" />
        </Picker>
      </View>

      {/* Ürünler */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <TouchableOpacity onPress={() => handleImagePress(item.imageUri)}>
              <Image
                source={{ uri: item.imageUri }}
                style={styles.productImage}
              />
            </TouchableOpacity>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}₺</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>

              {/* "Kişisel Bilgileri Gör" butonu */}
              <TouchableOpacity
                style={styles.showSellerInfoButton}
                onPress={() => handleShowSellerInfo(item)}
              >
                <Text style={styles.showSellerInfoButtonText}>Kişisel Bilgileri Gör</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Satıcı bilgilerini gösteren Modal */}
      {selectedSeller && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Satıcı Bilgileri</Text>
              <Text style={styles.modalText}>Ad: {selectedSeller.firstName}</Text>
              <Text style={styles.modalText}>Soyad: {selectedSeller.lastName}</Text>
              <Text style={styles.modalText}>Telefon: {selectedSeller.phone}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Fotoğrafı büyük olarak gösteren Modal */}
      {selectedImageUri && (
        <Modal
          visible={imageModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setImageModalVisible(false)}
        >
          <View style={styles.imageModalContainer}>
            <TouchableOpacity
              style={styles.imageModalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.imageModalCloseText}>Kapat</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImageUri }}
              style={styles.imageModal}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Vitrin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    color: '#e91e63',
    marginBottom: 10,
    fontWeight: '500',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 12,
    color: '#999',
  },
  showSellerInfoButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  showSellerInfoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imageModalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#e91e63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 1,
  },
  imageModalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageModal: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});
