import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Alert,
    ScrollView,
    Dimensions,
    Image,
    FlatList
} from "react-native";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useSelector, useDispatch } from 'react-redux';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

const HomePage = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);

   // console.log("data: ", data)
    useEffect(() => {
        if (error) {
            Alert.alert(error);
        }
    }, [error]);

    useEffect(() => {
        getDate();
        fetchImagesFromFirestore();
    }, []);

    useEffect(() => {
      if (autoScroll && images.length > 0) {
          const timer = setInterval(() => {
              const nextIndex = (currentIndex + 1) % images.length;
              setCurrentIndex(nextIndex);
              flatListRef.current?.scrollToIndex({ index: nextIndex });
          }, 3000);
          return () => clearInterval(timer)
      }
  }, [autoScroll, currentIndex, images]);

    const onPressCikis = () => {
        dispatch(logout())
    };

       const fetchImagesFromFirestore = async () => {
        setLoading(true);
        let fetchedImages = [];
        try {
            const querySnapshot = await getDocs(collection(db, "images"));
            fetchedImages = querySnapshot.docs.map((doc, index) => {
                const uri = `data:image/png;base64,${doc.data().content}`;
                //console.log("Fetched Image URI:", uri);
                return ({
                    id: doc.id,
                    uri: uri,
                    key: index.toString()
                })
            });

        } catch (error) {
            console.error("Firestore verileri çekilirken hata oluştu:", error);
        } finally {
            setImages(fetchedImages);
             setLoading(false);
        }
    };
     const sendData = async () => {
        try {
           const docRef = await addDoc(collection(db, "reactNativeLesson"), {
                 title: "Zero to Hero",
                 content: "React Native tutorial for beginner",
                 lesson: 95
            });
            console.log("Document written with ID: ", docRef.id);
       } catch (e) {
            console.error("Error adding document: ", e);
       }
   };
     const getDate = async () => {
          try {
               const querySnapshot = await getDocs(collection(db, "reactNativeLesson"));
               const allDAta = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
               setData(allDAta);
           } catch (error) {
             console.log(error);
          }
     };
     const deleteData = async (value) => {
          try {
              await deleteDoc(doc(db, "reactNativeLesson", value));
               console.log("SILME BASARILI")
         } catch (error) {
              console.log(error)
          }
    };

     const updateData = async () => {
         try {
             const lessonData = doc(db, "reactNativeLesson", "1sMxo5OYujZ9FTPwLKTX");
              await updateDoc(lessonData, {
                 lesson: 145
            });
       } catch (error) {
            console.log(error)
        }
      };
      const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
    );
     return (
      <ScrollView>
         <View style={styles.container}>
            <View style={styles.buttonContainer}>
           </View>
           <FlatList
                        ref={flatListRef}
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.key}
                        renderItem={renderItem}
                        onScrollBeginDrag={() => setAutoScroll(false)}
                        onScrollEndDrag={() => setAutoScroll(true)}
                    />
             <Text style={styles.HosgeldinText}>HOŞGELDİN</Text>
             <ScrollView >
               {data.map((value, index) => {
                    return (
                       <Pressable
                            onPress={() => deleteData(value.id)}
                            key={index}
                             style={styles.card}
                        >
                            <Text>ID: {value.id}</Text>
                             <Text>Başlık: {value.title}</Text>
                            <Text>İçerik: {value.content}</Text>
                            <Text>Ders: {value.lesson}</Text>
                        </Pressable>
                    );
                 })}
             </ScrollView>
              <Pressable
                    onPress={() => sendData()}
                    style={({ pressed }) => [
                         { backgroundColor: pressed ? "gray" : "pink" },
                         styles.button
                    ]}>
                <Text style={styles.buttonText}>VERİ KAYIT</Text>
              </Pressable>
              <Pressable
                    onPress={() => getDate()}
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? "gray" : "lightblue" },
                        styles.button
                   ]}>
                   <Text style={styles.buttonText}>GET DATA</Text>
                </Pressable>
             <Pressable
                    onPress={() => updateData()}
                     style={({ pressed }) => [
                       { backgroundColor: pressed ? "gray" : "#1DD3B0" },
                         styles.button
                   ]}>
                <Text style={styles.buttonText}>Güncelleme</Text>
            </Pressable>
         </View>
         </ScrollView>
     );
 };

export default HomePage;

const styles = StyleSheet.create({
    container: {
         flex: 1,
        alignItems: "center",
   },
      buttonContainer: {
            position: 'absolute',
            top: 10,
           right: 10,
    },
     HosgeldinText: {
           color: "black",
            fontWeight: "bold",
             marginTop: 20,
              fontSize: 24
     },
       button: {
            marginTop: 10,
            padding: 10,
           borderRadius: 5,
     },
        buttonText: {
            fontWeight: 'bold'
       },
    pagerView: {
        width: width,
         height: 200,
   },
        slide: {
           width: width,
            height: 200,
             justifyContent: 'center',
             alignItems: 'center',
              borderRadius: 5,
        },
       image: {
            width: '90%',
             height: '90%',
           resizeMode: 'contain'
     },
         card: {
              backgroundColor: "#f0f0f0",
             padding: 15,
            marginVertical: 8,
               borderRadius: 5,
            width: width * 0.9
         },
  });