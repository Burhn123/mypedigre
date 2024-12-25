import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from 'react-native-paper';
import { View, Button, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Print from 'react-native-print';

const denemeSoyagaci = () => {
    const [loading, setLoading] = useState(false);
    const [selectedKus, setSelectedKus] = useState(null);
    const [soyAgaci, setSoyAgaci] = useState([]);
    const [kuslar, setKuslar] = useState([]);
    const [isKuslarLoaded, setIsKuslarLoaded] = useState(false);
    const navigation = useNavigation();

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

    useEffect(() => {
        const fetchInitialKuslar = async () => {
            await fetchKuslar();
            setIsKuslarLoaded(true);
        }
        fetchInitialKuslar();
    }, []);

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
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, kuslar.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

    const generateSoyAgaciHTML = async (kunyeNo) => {
        const soyAgaci = await generateSoyAgaciData(kunyeNo);
      if (!soyAgaci || soyAgaci.length === 0) {
        return "<p>Soy ağacı bilgisi bulunamadı.</p>";
      }
         let htmlContent = `
         <html>
         <head>
          <style>
           body { font-family: sans-serif; }
             ul { list-style-type: none; padding-left: 20px; }
              li { margin-bottom: 5px; }
          </style>
         </head>
        <body>
         <h1> ${kunyeNo} Kuşunun Soy Ağacı</h1>
         `;

     const renderSoyAgaciHTML = (kus, level = 0) => {
       if (!kus) return "";

         const indentation = '&nbsp;'.repeat(level * 4);
           let html =  `
             <li>
             ${indentation} Ad: ${kus.ad}
             ${kus.anne ? `<ul><li>${indentation}&nbsp;├── Anne: ${kus.anne.ad}</li>` : ''}
             ${kus.baba ? `<li>${indentation}&nbsp;└── Baba: ${kus.baba.ad}</li></ul>` : ''}
             </li>`;
         if(kus.anne) html += renderSoyAgaciHTML(kus.anne, level+1);
         if(kus.baba) html += renderSoyAgaciHTML(kus.baba, level+1);
           return html;
      };

      soyAgaci.forEach((item) => {
          htmlContent +=  `<ul>${renderSoyAgaciHTML(item)}</ul>`
       });

        htmlContent +=  `</body></html>`;
        return htmlContent;

    };

   const handlePrint = async (kunyeNo) => {
       setLoading(true);
       try {
        const html = await generateSoyAgaciHTML(kunyeNo);
         if(html){
          await Print.printAsync({ html });
         }else {
         Alert.alert("Hata", "Yazdırma işlemi için HTML oluşturulamadı.");
         }
      } catch (error) {
        console.error("Yazdırma hatası:", error);
         Alert.alert("Hata", "Yazdırma işlemi sırasında bir hata oluştu.");
      } finally {
          setLoading(false);
      }
    };


    const generateSoyAgaciData = async (kunyeNo) => {
        setLoading(true);
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

               const doc = kuslar.find((k) => k.kunye_no?.toLowerCase() === currentKus.kunye_no?.toLowerCase());


               if (!doc) {
                  console.log("Önbellekte bulunamadı:", currentKus.kunye_no);
                   return;
               }

               const soyAgaciItem = { ...doc, level, parent: parentKunyeNo };
               soyAgaciList.push(soyAgaciItem);

                console.log("Kuş eklendi:", doc.kunye_no);
                const anne = doc.anne_adi ? await fetchKusByKunyeNo(doc.anne_adi, "female_bird") : null;
                console.log("recursiveFetch - anne:", anne);
                const baba = doc.baba_adi ? await fetchKusByKunyeNo(doc.baba_adi, "male_bird") : null;
                console.log("recursiveFetch - baba:", baba);


              if (anne) {
                    const updatedAnne = await recursiveFetch(anne, level + 1, doc.kunye_no);
                    soyAgaciItem.anne = updatedAnne;
               }
               if (baba) {
                   const updatedBaba = await recursiveFetch(baba, level + 1, doc.kunye_no);
                  soyAgaciItem.baba = updatedBaba;
               }

                 const children = await fetchChildrenByParents(doc.anne_adi, doc.baba_adi);
                console.log("recursiveFetch - children:", children);

               if (children && children.length > 0) {
                  for (const child of children) {
                     await recursiveFetch(child, level + 1, doc.kunye_no);
                  }
              }

                return soyAgaciItem;
          };


             const rootKus = await recursiveFetch(kuslar.find(k => k.kunye_no === kunyeNo));
            setLoading(false);
           if (rootKus){
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


  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Ad</DataTable.Title>
        <DataTable.Title>Anne Ad</DataTable.Title>
        <DataTable.Title>Baba Ad</DataTable.Title>
        <DataTable.Title>Kunye No</DataTable.Title>
      </DataTable.Header>

      {kuslar.slice(from, to).map((item) => (
        <DataTable.Row key={item.kunye_no}>
          <DataTable.Cell>{item.ad}</DataTable.Cell>
          <DataTable.Cell>{item.anne_adi}</DataTable.Cell>
          <DataTable.Cell>{item.baba_adi}</DataTable.Cell>
          <DataTable.Cell>
            <Button title="Yazdır" onPress={() => handlePrint(item.kunye_no)} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(kuslar.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${kuslar.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};
export default denemeSoyagaci;