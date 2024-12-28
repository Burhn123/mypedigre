import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Alert,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const HomePage = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);
    const navigation = useNavigation();

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
            return () => clearInterval(timer);
        }
    }, [autoScroll, currentIndex, images]);

    const fetchImagesFromFirestore = async () => {
        setLoading(true);
        let fetchedImages = [];
        try {
            const querySnapshot = await getDocs(collection(db, "images"));
            fetchedImages = querySnapshot.docs.map((doc, index) => {
                const uri = `data:image/png;base64,${doc.data().content}`;
                return {
                    id: doc.id,
                    uri: uri,
                    key: index.toString()
                };
            });
        } catch (error) {
            console.error("Firestore verileri çekilirken hata oluştu:", error);
        } finally {
            setImages(fetchedImages);
            setLoading(false);
        }
    };

    const sendData = async () => {
        const userId = auth?.currentUser?.uid; // Ensure user is logged in

        if (!userId) {
            Alert.alert(
                'Hata',
                'Lütfen giriş yapınız.',
                [{ text: 'Tamam', onPress: () => navigation.navigate('LoginPage') }]
            );
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "reactNativeLesson"), {
                title: "Zero to Hero",
                content: "React Native tutorial for beginner",
                lesson: 95,
                user: { _id: userId },  // Ensure valid user._id
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getDate = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "reactNativeLesson"));
            const allData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setData(allData);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteData = async (value) => {
        try {
            await deleteDoc(doc(db, "reactNativeLesson", value));
            console.log("SILME BASARILI");
            getDate();  // Refresh data after deletion
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async () => {
        try {
            const lessonData = doc(db, "reactNativeLesson", "1sMxo5OYujZ9FTPwLKTX");
            await updateDoc(lessonData, {
                lesson: 145
            });
            console.log("Data updated successfully");
            getDate();  // Refresh data after update
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
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
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                data.map((value, index) => (
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
                ))
            )}
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
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={'lightGray'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    HosgeldinText: {
        color: "black",
        fontWeight: "bold",
        marginTop: 20,
        fontSize: 24,
    },
    card: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
        width: width * 0.9
    },
    chatButton: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
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
    }
});

export default HomePage;
