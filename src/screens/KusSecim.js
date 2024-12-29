import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const KusSecim = ({ route }) => {
    const [kuslar, setKuslar] = useState([]);
    const [selectedKus, setSelectedKus] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchKuslar();
    }, []);

    const fetchKuslar = async () => {
        try {
            const femaleRef = collection(db, "female_bird");
            const maleRef = collection(db, "male_bird");a
            const femaleSnap = await getDocs(femaleRef);
            const maleSnap = await getDocs(maleRef);
            const allKuslar = [];
            femaleSnap.forEach((doc) => {
                allKuslar.push(doc.data());
            });
            maleSnap.forEach((doc) => {
                allKuslar.push(doc.data());
            });

            setKuslar(allKuslar);
            console.log("allKuşlar", allKuslar);
        } catch (error) {
            console.log("Kuşlar çekilirken hata çıktı", error);
        }
    };
    
    const handleKusPress = (kus) => {
        setSelectedKus(kus)
    };
    const handleSec = () => {
        if (selectedKus) {
            navigation.navigate('Soyagaci', { selectedKus }); // Seçilen kuşu parametre olarak gönder
        }
    };


    const generateKey = (kus) => {
        if (!kus.kunye_no) {
            return `random-${Math.random().toString(36).substring(2, 15)}`;
        }
        return kus.kunye_no;
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Kuş Seç</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Kuş Adı veya Künye Numarası ile Ara"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {kuslar
                .filter(kus =>
                    (kus.ad?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (kus.kunye_no?.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((kus) => {
                    const key = generateKey(kus);
                    return (
                        <TouchableOpacity
                            key={key}
                            style={[styles.kusItem, selectedKus?.kunye_no === kus.kunye_no && styles.selectedKus]}
                            onPress={() => handleKusPress(kus)}
                        >
                            <Text style={styles.kusText}>{kus.ad} - {key}</Text>
                        </TouchableOpacity>
                    )
                })}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSec}
            >
                <Text style={styles.buttonText}>Seç</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center"
    },
    kusItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    kusText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black"
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    selectedKus: {
        backgroundColor: '#e0e0e0'
    }
});

export default KusSecim;