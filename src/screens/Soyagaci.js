import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';

// Styled Components
const StyledContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
`;

const StyledHeader = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: lightblue;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const StyledButtonText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: black;
`;

const StyledSelectedKusContainer = styled.View`
  margin-top: 20px;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const StyledSelectedKusText = styled.Text`
  font-weight: bold;
`;

const StyledLoadingContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const StyledLoadingText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
`;

const StyledSoyAgaciContainer = styled.View`
  margin-top: 20px;
  padding-horizontal: 20px;
`;

const StyledSoyAgaciItemText = styled.Text`
   margin-bottom: 5px;
`;

const Soyagaci = () => {
    const [loading, setLoading] = useState(false);
    const [selectedKus, setSelectedKus] = useState(null);
    const [soyAgaci, setSoyAgaci] = useState([]);
    const [kuslar, setKuslar] = useState([]);
    const [isKuslarLoaded, setIsKuslarLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchInitialKuslar = async () => {
            await fetchKuslar();
            setIsKuslarLoaded(true);
        }
        fetchInitialKuslar();
    }, []);

     useEffect(() => {
        if (isKuslarLoaded && selectedKus) {
            handleKusSelect(selectedKus);
        }
    }, [isKuslarLoaded, selectedKus]);


    useFocusEffect(
        useCallback(() => {
            const clearState = () => {
                setSelectedKus(null);
                setSoyAgaci([]);
            };
            const params = navigation.getState().routes[navigation.getState().index].params;
            if (params && params.selectedKus) {
                setSelectedKus(params.selectedKus);
            }
            return () => {
                clearState();
            };
        }, [navigation])
    );


    const fetchKuslar = async () => {
        try {
            const femaleRef = collection(db, "female_bird");
            const maleRef = collection(db, "male_bird");
            const femaleSnap = await getDocs(femaleRef);
            const maleSnap = await getDocs(maleRef);
            const allKuslar = [];
            console.log("fetchKuslar öncesi:", allKuslar);
            femaleSnap.forEach((doc) => {
                allKuslar.push(doc.data());
            });
            maleSnap.forEach((doc) => {
                allKuslar.push(doc.data());
            });
             setKuslar(allKuslar);
             console.log('fetchKuslar sonrası:', allKuslar);
        } catch (error) {
            console.log("Kuşlar çekilirken hata çıktı", error);
        }
    };


    const handleKusSecimi = () => {
        navigation.navigate("KusSecim");
    };

   const handleKusSelect = async (kus) => {
        console.log("handleKusSelect - seçilen kuş:", kus);
       setSelectedKus(kus);
       try {
            const result = await generateSoyAgaciData(kus);
             if (!result || result.length === 0) {
                  console.error("Soy ağacı verisi alınamadı!");
                  setSelectedKus(null);
                  return;
              }
            setSoyAgaci(result);
        } catch (error) {
            console.error("Bir hata oluştu:", error);
            setSelectedKus(null);
        }
    };

      const generateSoyAgaciData = async (kus) => {
        setLoading(true);
        console.log("generateSoyAgaciData başlatıldı:", kus);
        try {
             const visitedKuşlar = new Set();
            const recursiveFetch = async (currentKus, level = 0) => {
             if (!currentKus || level > 5 || visitedKuşlar.has(currentKus.kunye_no)) {
               return null;
             }

             visitedKuşlar.add(currentKus.kunye_no);
             const doc = kuslar.find((k) => k.kunye_no?.toLowerCase() === currentKus.kunye_no?.toLowerCase());

             if (!doc) {
               console.log("Önbellekte bulunamadı:", currentKus.kunye_no);
                return null;
              }

             const soyAgaciItem = { ...doc, level };
            const anne = doc.anne_adi ? await fetchKusByKunyeNo(doc.anne_adi, "female_bird") : null;
             const baba = doc.baba_adi ? await fetchKusByKunyeNo(doc.baba_adi, "male_bird") : null;

             if (anne) {
                const updatedAnne = await recursiveFetch(anne, level + 1);
                  soyAgaciItem.anne = updatedAnne;
             }
             if (baba) {
                const updatedBaba = await recursiveFetch(baba, level + 1);
                 soyAgaciItem.baba = updatedBaba;
             }
             return soyAgaciItem;
           };


            const rootKus = await recursiveFetch(kus);
            setLoading(false);
             if(rootKus){
              console.log("generateSoyAgaciData tamamlandı, soyAgaciList:", rootKus);
              return [rootKus];
            }
          return [];
        } catch (error) {
             console.error("Soy ağacı verisi çekilirken hata oluştu:", error);
            setLoading(false);
             return [];
        }
    };


   const fetchKusByKunyeNo = async (kunyeNo, collectionName) => {
         console.log("fetchKusByKunyeNo çağrıldı:", kunyeNo, " collection:", collectionName);
           try {
                const kuşRef = collection(db, collectionName);
                let querySnapshot = await getDocs(kuşRef);
                let kusData = null;

               querySnapshot.forEach((doc) => {
                  if (doc.data().kunye_no?.toLowerCase() === kunyeNo?.toLowerCase()) {
                       kusData = doc.data();
                    }
                });
               console.log("fetchKusByKunyeNo - sonuç:", kusData);
                return kusData;
            } catch (error) {
              console.log("fetchKusByKunyeNo - hata:", error);
               return null;
            }
    };

     const fetchChildrenByParents = async (anne_adi, baba_adi) => {
       console.log("fetchChildrenByParents çağrıldı:", anne_adi, " baba:", baba_adi);
         try {
           const femaleRef = collection(db, "female_bird");
           const maleRef = collection(db, "male_bird");
           const femaleSnap = await getDocs(femaleRef);
            const maleSnap = await getDocs(maleRef);
           const allKuslar = [];

            femaleSnap.forEach((doc) => {
                allKuslar.push(doc.data());
            });
           maleSnap.forEach((doc) => {
               allKuslar.push(doc.data());
           });
           const children = [];

             allKuslar.forEach((doc) => {
                if (doc.anne_adi?.toLowerCase() === anne_adi?.toLowerCase() && doc.baba_adi?.toLowerCase() === baba_adi?.toLowerCase()) {
                    children.push(doc);
                 }
           });
          console.log("fetchChildrenByParents - sonuç:", children);
          return children;
        } catch (error) {
             console.log("fetchChildrenByParents - hata:", error);
            return [];
         }
   };

  const renderSoyAgaci = (kus, level = 0) => {
       if (!kus) return null;

         const indentation = '  '.repeat(level);

       return (
           <View key={kus.kunye_no}>
                <StyledSoyAgaciItemText>{indentation}Ad: {kus.ad} </StyledSoyAgaciItemText>
                {kus.anne && <StyledSoyAgaciItemText>{indentation}├── Anne: {kus.anne.ad} </StyledSoyAgaciItemText>}
                {kus.baba && <StyledSoyAgaciItemText>{indentation}└── Baba: {kus.baba.ad} </StyledSoyAgaciItemText>}
                {kus.anne && renderSoyAgaci(kus.anne, level + 1)}
                {kus.baba && renderSoyAgaci(kus.baba, level + 1)}
           </View>
        )
    }

    return (
        <StyledContainer>
            <StyledHeader>Soy Ağacı Oluştur</StyledHeader>
            <StyledButton onPress={handleKusSecimi}>
                <StyledButtonText>Kuş Seç</StyledButtonText>
            </StyledButton>
            {selectedKus && (
                <StyledSelectedKusContainer>
                    <StyledSelectedKusText>Seçilen Kuş: {selectedKus.ad}</StyledSelectedKusText>
                </StyledSelectedKusContainer>
            )}
            {soyAgaci && soyAgaci.length > 0 && (
                <StyledSoyAgaciContainer>
                    {soyAgaci.map((item) => renderSoyAgaci(item))}
                </StyledSoyAgaciContainer>
            )}
            {loading && (
                <StyledLoadingContainer>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <StyledLoadingText>Soy ağacı oluşturuluyor...</StyledLoadingText>
                </StyledLoadingContainer>
            )}
        </StyledContainer>
    );
};

export default Soyagaci;