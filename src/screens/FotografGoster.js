import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebaseConfig";
import { useSelector } from 'react-redux'; // Redux useSelector'ı import et

const FotografGoster = () => {
    const [imageUris, setImageUris] = useState([]);
    const [loading, setLoading] = useState(false);
    //const user = useSelector((state) => state.user.user); // Kullanıcıyı Redux'tan al
    const {user} = useSelector((state)=>state.user);

    const fetchImagesFromFirestore = async () => {
        if (!user || !user.uid) { // Kullanıcı veya uid yoksa yüklemeyi durdur
            console.log("Kullanıcı bilgisi bulunamadı.");
            return;
        }
        setLoading(true);
        try {
            const imagesRef = collection(db, "images");
            const q = query(imagesRef, where("user_id", "==", user.uid)); // Kullanıcı kimliğine göre sorgu
            //console.log("q",q)
            const querySnapshot = await getDocs(q);
            const images = querySnapshot.docs.map(doc => ({
                id: doc.id,
                uri: `data:image/png;base64,${doc.data().content}`,
            }));
            setImageUris(images);
            console.log("images",images)
        } catch (error) {
            console.error("Firestore verileri çekilirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={fetchImagesFromFirestore}>
                <Text style={styles.buttonText}>Fotoğrafları Listele</Text>
            </TouchableOpacity>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {imageUris.map((image) => (
                        <View style={styles.imageContainer} key={image.id}>
                            <Image source={{ uri: image.uri }} style={styles.image} />
                        </View>
                    ))}
                    {imageUris.length === 0 && !loading && (
                        <Text style={styles.text}>Henüz kayıtlı fotoğraf bulunmuyor.</Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    imageContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        borderRadius: 5
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
    },
});

export default FotografGoster;



/*import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

const FotografGoster = () => {
  const [imageUris, setImageUris] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImagesFromFirestore = async () => {
    setLoading(true);
    try {
        const querySnapshot = await getDocs(collection(db, "images")); // "images" koleksiyonunu çağırın
       
       // const allDAta=[]
        const images = querySnapshot.docs.map(doc => {
            return  ({
                id: doc.id,
                uri: `data:image/png;base64,${doc.data().content}`,
                });
                
        });
       setImageUris(images);
       
    } catch (error) {
        console.error("Firestore verileri çekilirken hata oluştu:", error);
    } finally {
        setLoading(false);
    }
  };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={fetchImagesFromFirestore}>
                <Text style={styles.buttonText}>Fotoğrafları Listele</Text>
            </TouchableOpacity>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                  <ScrollView contentContainerStyle={styles.scrollContainer}>
                      {imageUris.map((image) => (
                          <View style={styles.imageContainer} key={image.id}>
                            <Image source={{ uri: image.uri }} style={styles.image} />
                          </View>
                      ))}
                      {imageUris.length === 0 && !loading && (
                        <Text style={styles.text}>Henüz kayıtlı fotoğraf bulunmuyor.</Text>
                      )}
                  </ScrollView>
            )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 20,
      paddingHorizontal: 10
    },
  imageContainer: {
        marginTop: 10,
      borderWidth: 1,
      borderColor: 'lightgray',
      padding: 5,
      borderRadius: 5
  },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
  button: {
      backgroundColor: 'lightgray',
    padding: 10,
      borderRadius: 5,
      marginTop: 20,
  },
    buttonText: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
    },
});
export default FotografGoster;
*/