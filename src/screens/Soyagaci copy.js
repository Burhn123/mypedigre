import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Soyagaci = () => {
    const [loading, setLoading] = useState(false);
    const [selectedKus, setSelectedKus] = useState(null);
    const [soyAgaci, setSoyAgaci] = useState([]);
    const [kuslar, setKuslar] = useState([]);
    const [isKuslarLoaded, setIsKuslarLoaded] = useState(false); // kuşlar yüklendi mi state
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
            if(params && params.selectedKus) {
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
          console.log("fetchKuslar öncesi:",allKuslar);
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
             const soyAgaciList = [];
             const visitedKuşlar = new Set();

             const recursiveFetch = async (currentKus, level = 0, parentKunyeNo = null) => {
               if (level > 5) {
                     console.log("Maksimum seviye aşıldı:", currentKus.kunye_no, "level:", level);
                    return;
                }
               console.log("recursiveFetch çağrıldı:", currentKus.kunye_no, " seviye: ", level, " parent: ", parentKunyeNo);
                if (visitedKuşlar.has(currentKus.kunye_no)) {
                    console.log("Ziyaret edilmiş kuş atlanıyor:", currentKus.kunye_no);
                     return;
                 }
                 visitedKuşlar.add(currentKus.kunye_no);
                const collectionName = currentKus.cinsiyet === 'Dişi' ? 'female_bird' : 'male_bird';


                const doc = kuslar.find((k) => k.kunye_no?.toLowerCase() === currentKus.kunye_no?.toLowerCase());
               if (!doc) {
                   console.log("Önbellekte bulunamadı:", currentKus.kunye_no);
                   return;
               }
                soyAgaciList.push({ ...doc, level, parent: parentKunyeNo });
                console.log("Kuş eklendi:", doc.kunye_no);
                 const anne = doc.anne_adi ? await fetchKusByKunyeNo(doc.anne_adi, "female_bird") : null;
                console.log("recursiveFetch - anne:", anne);
                 const baba = doc.baba_adi ? await fetchKusByKunyeNo(doc.baba_adi, "male_bird") : null;
                console.log("recursiveFetch - baba:", baba);

                if (anne) {
                   await recursiveFetch(anne, level + 1, doc.kunye_no);
                }
                 if (baba) {
                   await recursiveFetch(baba, level + 1, doc.kunye_no);
                }
                const children = await fetchChildrenByParents(doc.anne_adi, doc.baba_adi);
                 console.log("recursiveFetch - children:", children);
                if (children && children.length > 0) {
                   for (const child of children) {
                         await recursiveFetch(child, level + 1, doc.kunye_no);
                    }
               }
           };
           await recursiveFetch(kus);
           setLoading(false);
           console.log("generateSoyAgaciData tamamlandı, soyAgaciList:", soyAgaciList);
           return soyAgaciList;
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
                 if (doc.data().kunye_no == kunyeNo) {
                       kusData = doc.data();
                    }
             });
            console.log("fetchKusByKunyeNo - sonuç:", kusData);
            return kusData;
       }
      catch (error) {
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
               if (doc.anne_adi === anne_adi && doc.baba_adi === baba_adi) {
                     children.push(doc);
                 }
           });
           console.log("fetchChildrenByParents - sonuç:", children);
           return children;

        } catch (error) {
            console.log("fetchChildrenByParents - hata:", error);
            return null;
        }
   };
    const generateHTMLContent = () => {
        let html = `<h1>${selectedKus?.ad} Soy Ağacı</h1>`;
       soyAgaci.forEach(kus => {
            let indent = '&nbsp;'.repeat(kus.level * 4);
           html+= `<p style="margin-left: ${indent.length * 10}px"><strong>${kus.ad}</strong> Annesi: ${kus.anne_adi} Babası: ${kus.baba_adi} </p>`
         });
      return html;
    };
   const createPDF = async () => {
        if (!selectedKus || soyAgaci.length === 0) {
           Alert.alert("Uyarı", "Lütfen bir kuş seçin ve soy ağacını oluşturun.");
             return;
        }
       setLoading(true);
       try {
            const htmlContent = generateHTMLContent();
           let options = {
                 html: htmlContent,
                fileName: `${selectedKus.ad}_soy_agaci`,
               directory: 'Documents',
            };
            console.log("createPDF - RNHTMLtoPDF.convert çağrılıyor:", options); //convert çağrı öncesi logu
          const file = await RNHTMLtoPDF.convert(options);
           console.log("createPDF - RNHTMLtoPDF.convert tamamlandı:", file);
            if(file && file.filePath){
              Alert.alert("Başarılı", "PDF Oluşturuldu.");
              console.log("PDF Oluşturuldu:", file.filePath);
            }else{
               Alert.alert("Hata", "PDF oluşturulamadı.");
               console.error("Dosya yolu yok veya işlem başarısız.");
             }
             setLoading(false);
        } catch (error) {
            console.error("PDF oluşturulurken hata oluştu:", error);
           setLoading(false);
           Alert.alert("Hata", `PDF oluşturulamadı: ${error.message}`);
        }
   };

    return (
        <ScrollView style={styles.container}>
           <Text style={styles.header}>Soy Ağacı Oluştur</Text>
            <TouchableOpacity style={styles.button} onPress={handleKusSecimi}>
                <Text style={styles.buttonText}>Kuş Seç</Text>
            </TouchableOpacity>
           {selectedKus && (
                <View style={styles.selectedKusContainer}>
                    <Text style={styles.selectedKusText}>Seçilen Kuş: {selectedKus.ad}</Text>
               </View>
            )}
           {selectedKus && soyAgaci && soyAgaci.length > 0 && (
              <TouchableOpacity style={styles.button} onPress={createPDF}>
                  <Text style={styles.buttonText}>PDF Oluştur</Text>
              </TouchableOpacity>
          )}
            {loading && (
               <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.loadingText}>Soy ağacı oluşturuluyor...</Text>
              </View>
           )}
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
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    selectedKusContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedKusText: {
        fontWeight: 'bold',
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
   loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default Soyagaci;