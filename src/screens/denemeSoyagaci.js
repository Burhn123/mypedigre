import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from 'react-native-paper';
import { View, Button, Alert, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firebase importlarını güncelledik
import { db } from '../../firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const denemeSoyagaci = () => {
    const [loading, setLoading] = useState(false);
    const [selectedKus, setSelectedKus] = useState(null);
    const [soyAgaci, setSoyAgaci] = useState([]);
    const [kuslar, setKuslar] = useState([]);
    const [isKuslarLoaded, setIsKuslarLoaded] = useState(false);
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [printHTML, setPrintHTML] = useState('');

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([20]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

    useEffect(() => {
        const fetchInitialKuslar = async () => {
            await fetchKuslar();
            setIsKuslarLoaded(true);
        };
        fetchInitialKuslar();
    }, []);

    const fetchKuslar = async () => {
        try {
            const femaleRef = collection(db, "female_bird");
            const maleRef = collection(db, "male_bird");
            const femaleSnap = await getDocs(femaleRef);
            const maleSnap = await getDocs(maleRef);
            const Disi = [];
            const Erkek = [];

            femaleSnap.forEach((doc) => {
                Disi.push({ ...doc.data(), type: "female", id: doc.id });
            });

            maleSnap.forEach((doc) => {
                Erkek.push({ ...doc.data(), type: "male", id: doc.id });
            });

            setKuslar([...Erkek, ...Disi]);
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
        try {
          const selectedKus = kuslar.find((k) => k.kunye_no === kunyeNo);
      
          if (!selectedKus) {
            return "<p>Seçilen kuş bulunamadı.</p>";
          }
      
          const anne = selectedKus.anne_adi
            ? await fetchKusByKunyeNo(selectedKus.anne_adi, "female_bird")
            : null;
          const baba = selectedKus.baba_adi
            ? await fetchKusByKunyeNo(selectedKus.baba_adi, "male_bird")
            : null;
      
          let anneAnne = null;
          let anneBaba = null;
          let babaAnne = null;
          let babaBaba = null;
      
          if (anne) {
            anneAnne = anne.anne_adi
              ? await fetchKusByKunyeNo(anne.anne_adi, "female_bird")
              : null;
            anneBaba = anne.baba_adi
              ? await fetchKusByKunyeNo(anne.baba_adi, "male_bird")
              : null;
          }
      
          if (baba) {
            babaAnne = baba.anne_adi
              ? await fetchKusByKunyeNo(baba.anne_adi, "female_bird")
              : null;
            babaBaba = baba.baba_adi
              ? await fetchKusByKunyeNo(baba.baba_adi, "male_bird")
              : null;
          }
      
          let anneAnneAnne = null;
          let anneAnneBaba = null;
          let anneBabaAnne = null;
          let anneBabaBaba = null;
      
          let babaAnneAnne = null;
          let babaAnneBaba = null;
          let babaBabaAnne = null;
          let babaBabaBaba = null;
      
          if (anneAnne) {
            anneAnneAnne = anneAnne.anne_adi
              ? await fetchKusByKunyeNo(anneAnne.anne_adi, "female_bird")
              : null;
            anneAnneBaba = anneAnne.baba_adi
              ? await fetchKusByKunyeNo(anneAnne.baba_adi, "male_bird")
              : null;
          }
          if (anneBaba) {
            anneBabaAnne = anneBaba.anne_adi
              ? await fetchKusByKunyeNo(anneBaba.anne_adi, "female_bird")
              : null;
            anneBabaBaba = anneBaba.baba_adi
              ? await fetchKusByKunyeNo(anneBaba.baba_adi, "male_bird")
              : null;
          }
      
          if (babaAnne) {
            babaAnneAnne = babaAnne.anne_adi
              ? await fetchKusByKunyeNo(babaAnne.anne_adi, "female_bird")
              : null;
            babaAnneBaba = babaAnne.baba_adi
              ? await fetchKusByKunyeNo(babaAnne.baba_adi, "male_bird")
              : null;
          }
          if (babaBaba) {
            babaBabaAnne = babaBaba.anne_adi
              ? await fetchKusByKunyeNo(babaBaba.anne_adi, "female_bird")
              : null;
            babaBabaBaba = babaBaba.baba_adi
              ? await fetchKusByKunyeNo(babaBaba.baba_adi, "male_bird")
              : null;
          }
            let anneAnneAnneAnne = null;
            let anneAnneAnneBaba = null;
            let anneAnneBabaAnne = null;
            let anneAnneBabaBaba = null;
      
            let anneBabaAnneAnne = null;
            let anneBabaAnneBaba = null;
            let anneBabaBabaAnne = null;
            let anneBabaBabaBaba = null;
      
             let babaAnneAnneAnne = null;
            let babaAnneAnneBaba = null;
            let babaAnneBabaAnne = null;
            let babaAnneBabaBaba = null;
      
             let babaBabaAnneAnne = null;
            let babaBabaAnneBaba = null;
            let babaBabaBabaAnne = null;
            let babaBabaBabaBaba = null;
      
            if (anneAnneAnne) {
                  anneAnneAnneAnne = anneAnneAnne.anne_adi ? await fetchKusByKunyeNo(anneAnneAnne.anne_adi, "female_bird") : null;
                  anneAnneAnneBaba = anneAnneAnne.baba_adi ? await fetchKusByKunyeNo(anneAnneAnne.baba_adi, "male_bird") : null;
            }
           if (anneAnneBaba) {
                anneAnneBabaAnne = anneAnneBaba.anne_adi ? await fetchKusByKunyeNo(anneAnneBaba.anne_adi, "female_bird") : null;
                anneAnneBabaBaba = anneAnneBaba.baba_adi ? await fetchKusByKunyeNo(anneAnneBaba.baba_adi, "male_bird") : null;
          }
      
          if (anneBabaAnne) {
                 anneBabaAnneAnne = anneBabaAnne.anne_adi ? await fetchKusByKunyeNo(anneBabaAnne.anne_adi, "female_bird") : null;
                anneBabaAnneBaba = anneBabaAnne.baba_adi ? await fetchKusByKunyeNo(anneBabaAnne.baba_adi, "male_bird") : null;
          }
            if(anneBabaBaba) {
                  anneBabaBabaAnne = anneBabaBaba.anne_adi ? await fetchKusByKunyeNo(anneBabaBaba.anne_adi, "female_bird") : null;
                  anneBabaBabaBaba = anneBabaBaba.baba_adi ? await fetchKusByKunyeNo(anneBabaBaba.baba_adi, "male_bird") : null;
            }
             if (babaAnneAnne) {
                  babaAnneAnneAnne = babaAnneAnne.anne_adi ? await fetchKusByKunyeNo(babaAnneAnne.anne_adi, "female_bird") : null;
                  babaAnneAnneBaba = babaAnneAnne.baba_adi ? await fetchKusByKunyeNo(babaAnneAnne.baba_adi, "male_bird") : null;
            }
          if(babaAnneBaba) {
               babaAnneBabaAnne = babaAnneBaba.anne_adi ? await fetchKusByKunyeNo(babaAnneBaba.anne_adi, "female_bird") : null;
              babaAnneBabaBaba = babaAnneBaba.baba_adi ? await fetchKusByKunyeNo(babaAnneBaba.baba_adi, "male_bird") : null;
          }
            if(babaBabaAnne){
                   babaBabaAnneAnne = babaBabaAnne.anne_adi ? await fetchKusByKunyeNo(babaBabaAnne.anne_adi, "female_bird") : null;
                  babaBabaAnneBaba = babaBabaAnne.baba_adi ? await fetchKusByKunyeNo(babaBabaAnne.baba_adi, "male_bird") : null;
            }
            if (babaBabaBaba) {
               babaBabaBabaAnne = babaBabaBaba.anne_adi ? await fetchKusByKunyeNo(babaBabaBaba.anne_adi, "female_bird") : null;
                 babaBabaBabaBaba = babaBabaBaba.baba_adi ? await fetchKusByKunyeNo(babaBabaBaba.baba_adi, "male_bird") : null;
            }
      
          const htmlContent = `
              <html>
                <head>
                  <style>
                      body {
                          font-family: sans-serif;
                          padding-top: 150px;
                      }
                      .container {
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                      }
                       .card {
                          background-color: #e0e0e0;
                          border-radius: 5px;
                          padding: 20px;
                          margin: 10px 2;
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                          width: 90%;
                          text-align: center;
                          color: #000;
                      }
                      .title {
                          font-size: 18px;
                          font-weight: bold;
                          margin-bottom: 5px;
                      }
                      .distance {
                          font-size: 16px;
                          margin-bottom: 3px;
                      }
                      .reward {
                          font-size: 14px;
                          margin-bottom: 3px;
                      }
                      .note {
                          font-size: 14px;
                          color: #000;
                          margin-bottom: 3px;
                      }
                      .parents {
                          display: flex;
                          justify-content: center;
                          width: 100%;
                           position: relative;
                      }
                      .parent-line {
                          position: absolute;
                           left: 50%;
                           top: 50%;
                          transform: translateX(-50%);
                          height: 2px;
                         width: 90%;
                          background: #ccc;
                          z-index: -1;
                      }
                      .parent {
                          background-color: #e0e0e0;
                          border-radius: 10px;
                          padding: 20px;
                          margin: 10px 0;
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                          width: 40%;
                          text-align: center;
                           color: #000;
                           position: relative;
                      }
                       .grandparents {
                           display: flex;
                          justify-content: center;
                          width: 100%;
                          margin-top: 10px;
                           position: relative;
                       }
                        .grandparent {
                            background-color: #e0e0e0;
                              border-radius: 10px;
                              padding: 20px;
                              margin: 10px 5px;
                              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                              width: 22%;
                              text-align: center;
                               color: #000;
                              position: relative;
                           }
                            .great-grandparents {
                                display: flex;
                              justify-content: center;
                                width: 100%;
                              margin-top: 10px;
                              position: relative;
                             }
                              .great-grandparent {
                                  background-color: #e0e0e0;
                                  border-radius: 10px;
                                  padding: 20px;
                                  margin: 10px 5px;
                                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                                  width: 14%;
                                  text-align: center;
                                  color: #000;
                                  position: relative;
                              }
                               .great-great-grandparents {
                                   display: flex;
                                  justify-content: center;
                                  width: 100%;
                                  margin-top: 10px;
                                   position: relative;
                              }
                               .great-great-grandparent {
                                  background-color: #e0e0e0;
                                  border-radius: 10px;
                                  padding: 20px;
                                   margin: 10px 5px;
                                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                                  width: 10%;
                                  text-align: center;
                                   color: #000;
                                   position: relative;
                              }
                                    .connection-line {
                                          position: absolute;
                                          left: 50%;
                                          top: 0;
                                          transform: translateX(-50%);
                                          height: 50%; /* Kartların üst yarısına çizgi */
                                          border-left: 2px solid #ccc; /* Çizgi stili */
                                          z-index: -1; /* Kartların arkasında */
                                   }
                                    .separator-container {
                                      position: relative;
                                      width: 50px;
                                      height: 80px;
                                      margin: 0 0px;
                                  }
                                    .separator-vertical-top {
                                      position: absolute;
                                      top: 0;
                                      left: 50%;
                                      height: 40px;
                                      width: 2px;
                                      background-color: black;
                                      transform: translateX(-50%);
                                  }
      
                                    .separator-horizontal {
                                      position: absolute;
                                      top: 40px;
                                      left: 0;
                                      height: 2px;
                                      width: 100%;
                                      background-color: black;
                                   }
      
                                  .separator-vertical-bottom-left {
                                        position: absolute;
                                        top: 40px;
                                        left: 0;
                                        height: 60px;
                                        width: 2px;
                                        background-color: black;
                                  }
      
                                  .separator-vertical-bottom-right {
                                        position: absolute;
                                        top: 40px;
                                        right: 0;
                                        height: 60px;
                                        width: 2px;
                                         background-color: black;
                                  }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="card">
                      <div class="title">${selectedKus.ad}</div>
                      <div class="distance">Kategori: ${selectedKus.category}</div>
                       <div class="reward">Cinsiyet: ${selectedKus.cinsiyet}</div>
                        <div class="reward">Kan Hattı: ${selectedKus.kan_hatti}</div>
                      <div class="reward">Renk: ${selectedKus.renk}</div>
                       <div class="note">Sahip: ${selectedKus.sahip}</div>
                    </div>
                     <div class="parents">
                         <div class="parent-line"></div>
                      ${anne ? `
                        <div class="parent">
                          <div class="connection-line"></div>
                          <div class="title">Anne: ${anne.ad}</div>
                            <div class="distance">Kategori: ${anne.category}</div>
                             <div class="reward">Cinsiyet: ${anne.cinsiyet}</div>
                           <div class="reward">Kan Hattı: ${anne.kan_hatti}</div>
                          <div class="reward">Renk: ${anne.renk}</div>
                             <div class="note">Sahip: ${anne.sahip}</div>
                        </div>
                         <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                            </div>
                      ` : ""}
                        ${baba ? `
                          <div class="parent">
                              <div class="connection-line"></div>
                              <div class="title">Baba: ${baba.ad}</div>
                              <div class="distance">Kategori: ${baba.category}</div>
                               <div class="reward">Cinsiyet: ${baba.cinsiyet}</div>
                             <div class="reward">Kan Hattı: ${baba.kan_hatti}</div>
                              <div class="reward">Renk: ${baba.renk}</div>
                              <div class="note">Sahip: ${baba.sahip}</div>
                          </div>
                        ` : ""}
                    </div>
                    <div class="grandparents">
                     ${anneAnne ? `
                           <div class="grandparent">
                              <div class="connection-line"></div>
                            <div class="title">Anne Anne: ${anneAnne.ad}</div>
                           <div class="distance">Kategori: ${anneAnne.category}</div>
                              <div class="reward">Cinsiyet: ${anneAnne.cinsiyet}</div>
                             <div class="reward">Kan Hattı: ${anneAnne.kan_hatti}</div>
                              <div class="reward">Renk: ${anneAnne.renk}</div>
                            <div class="note">Sahip: ${anneAnne.sahip}</div>
                          </div>
                             <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                            </div>
                      `: ""}
                      ${anneBaba ? `
                           <div class="grandparent">
                               <div class="connection-line"></div>
                              <div class="title">Anne Baba: ${anneBaba.ad}</div>
                               <div class="distance">Kategori: ${anneBaba.category}</div>
                             <div class="reward">Cinsiyet: ${anneBaba.cinsiyet}</div>
                             <div class="reward">Kan Hattı: ${anneBaba.kan_hatti}</div>
                             <div class="reward">Renk: ${anneBaba.renk}</div>
                            <div class="note">Sahip: ${anneBaba.sahip}</div>
                         </div>
                            <div></div>
                       `: ""}
                      ${babaAnne ? `
                          <div class="grandparent">
                               <div class="connection-line"></div>
                              <div class="title">Baba Anne: ${babaAnne.ad}</div>
                              <div class="distance">Kategori: ${babaAnne.category}</div>
                               <div class="reward">Cinsiyet: ${babaAnne.cinsiyet}</div>
                              <div class="reward">Kan Hattı: ${babaAnne.kan_hatti}</div>
                               <div class="reward">Renk: ${babaAnne.renk}</div>
                              <div class="note">Sahip: ${babaAnne.sahip}</div>
                          </div>
                             <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                            </div>
                     ` : ""}
                      ${babaBaba ? `
                         <div class="grandparent">
                              <div class="connection-line"></div>
                            <div class="title">Baba Baba: ${babaBaba.ad}</div>
                              <div class="distance">Kategori: ${babaBaba.category}</div>
                             <div class="reward">Cinsiyet: ${babaBaba.cinsiyet}</div>
                            <div class="reward">Kan Hattı: ${babaBaba.kan_hatti}</div>
                             <div class="reward">Renk: ${babaBaba.renk}</div>
                            <div class="note">Sahip: ${babaBaba.sahip}</div>
                          </div>
                      `: ""}
                    </div>
                  <div class="great-grandparents">
                      ${anneAnne ? `
                         ${anneAnneAnne ? `
                               <div class="great-grandparent">
                                 <div class="connection-line"></div>
                                  <div class="title">Anne Anne Anne: ${anneAnneAnne.ad}</div>
                                  <div class="distance">Kategori: ${anneAnneAnne.category}</div>
                                   <div class="reward">Cinsiyet: ${anneAnneAnne.cinsiyet}</div>
                                    <div class="reward">Kan Hattı: ${anneAnneAnne.kan_hatti}</div>
                                  <div class="reward">Renk: ${anneAnneAnne.renk}</div>
                                  <div class="note">Sahip: ${anneAnneAnne.sahip}</div>
                               </div>
                                   <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                            </div>
                          ` : ""}
                           ${anneAnneBaba ? `
                               <div class="great-grandparent">
                                   <div class="connection-line"></div>
                                 <div class="title">Anne Anne Baba: ${anneAnneBaba.ad}</div>
                                  <div class="distance">Kategori: ${anneAnneBaba.category}</div>
                                  <div class="reward">Cinsiyet: ${anneAnneBaba.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${anneAnneBaba.kan_hatti}</div>
                                 <div class="reward">Renk: ${anneAnneBaba.renk}</div>
                                  <div class="note">Sahip: ${anneAnneBaba.sahip}</div>
                              </div>
                                  
                           ` : ""}
                      ` : ""}
                      ${anneBaba ? `
                           ${anneBabaAnne ? `
                               <div class="great-grandparent">
                                 <div class="connection-line"></div>
                                  <div class="title">Anne Baba Anne: ${anneBabaAnne.ad}</div>
                                  <div class="distance">Kategori: ${anneBabaAnne.category}</div>
                                 <div class="reward">Cinsiyet: ${anneBabaAnne.cinsiyet}</div>
                                 <div class="reward">Kan Hattı: ${anneBabaAnne.kan_hatti}</div>
                                 <div class="reward">Renk: ${anneBabaAnne.renk}</div>
                                 <div class="note">Sahip: ${anneBabaAnne.sahip}</div>
                              </div>
                                    <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                            </div>
                           ` : ""}
                           ${anneBabaBaba ? `
                             <div class="great-grandparent">
                                 <div class="connection-line"></div>
                                 <div class="title">Anne Baba Baba: ${anneBabaBaba.ad}</div>
                                  <div class="distance">Kategori: ${anneBabaBaba.category}</div>
                                 <div class="reward">Cinsiyet: ${anneBabaBaba.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${anneBabaBaba.kan_hatti}</div>
                                  <div class="reward">Renk: ${anneBabaBaba.renk}</div>
                                 <div class="note">Sahip: ${anneBabaBaba.sahip}</div>
                              </div>
                          ` : ""}
                      `: ""}
                    ${babaAnne ? `
                        ${babaAnneAnne ? `
                              <div class="great-grandparent">
                                  <div class="connection-line"></div>
                                  <div class="title">Baba Anne Anne: ${babaAnneAnne.ad}</div>
                                  <div class="distance">Kategori: ${babaAnneAnne.category}</div>
                                   <div class="reward">Cinsiyet: ${babaAnneAnne.cinsiyet}</div>
                                  <div class="reward">Kan Hattı: ${babaAnneAnne.kan_hatti}</div>
                                 <div class="reward">Renk: ${babaAnneAnne.renk}</div>
                                   <div class="note">Sahip: ${babaAnneAnne.sahip}</div>
                              </div>
                                    <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                            </div>
                         ` : ""}
                          ${babaAnneBaba ? `
                              <div class="great-grandparent">
                                   <div class="connection-line"></div>
                                  <div class="title">Baba Anne Baba: ${babaAnneBaba.ad}</div>
                                  <div class="distance">Kategori: ${babaAnneBaba.category}</div>
                                 <div class="reward">Cinsiyet: ${babaAnneBaba.cinsiyet}</div>
                                 <div class="reward">Kan Hattı: ${babaAnneBaba.kan_hatti}</div>
                                  <div class="reward">Renk: ${babaAnneBaba.renk}</div>
                                   <div class="note">Sahip: ${babaAnneBaba.sahip}</div>
                              </div>
                                  
                          ` : ""}
                     ` : ""}
                    ${babaBaba ? `
                         ${babaBabaAnne ? `
                             <div class="great-grandparent">
                                  <div class="connection-line"></div>
                                  <div class="title">Baba Baba Anne: ${babaBabaAnne.ad}</div>
                                  <div class="distance">Kategori: ${babaBabaAnne.category}</div>
                                 <div class="reward">Cinsiyet: ${babaBabaAnne.cinsiyet}</div>
                                 <div class="reward">Kan Hattı: ${babaBabaAnne.kan_hatti}</div>
                                  <div class="reward">Renk: ${babaBabaAnne.renk}</div>
                                 <div class="note">Sahip: ${babaBabaAnne.sahip}</div>
                             </div>
                            <div class="separator-container">
                                <div class="separator-vertical-top"></div>
                                <div class="separator-horizontal"></div>
                            </div>
                         ` : ""}
                          ${babaBabaBaba ? `
                             <div class="great-grandparent">
                                 <div class="connection-line"></div>
                                  <div class="title"> ${babaBabaBaba.ad}</div>
                                  <div class="distance">Kategori: ${babaBabaBaba.category}</div>
                                  <div class="reward">Cinsiyet: ${babaBabaBaba.cinsiyet}</div>
                                 <div class="reward">Kan Hattı: ${babaBabaBaba.kan_hatti}</div>
                                  <div class="reward">Renk: ${babaBabaBaba.renk}</div>
                                 <div class="note">Sahip: ${babaBabaBaba.sahip}</div>
                             </div>
                        ` : ""}
                    `: ""}
               </div>
                <div class="great-great-grandparents">
                       ${anneAnneAnne ? `
                              ${anneAnneAnneAnne ? `
                                  <div class="great-great-grandparent">
                                      <div class="connection-line"></div>
                                      <div class="title">Anne Anne Anne Anne: ${anneAnneAnneAnne.ad}</div>
                                        <div class="distance">Kategori: ${anneAnneAnneAnne.category}</div>
                                         <div class="reward">Cinsiyet: ${anneAnneAnneAnne.cinsiyet}</div>
                                        <div class="reward">Kan Hattı: ${anneAnneAnneAnne.kan_hatti}</div>
                                         <div class="reward">Renk: ${anneAnneAnneAnne.renk}</div>
                                          <div class="note">Sahip: ${anneAnneAnneAnne.sahip}</div>
                                  </div>
                                     <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                             <div class="separator-vertical-bottom-left"></div>
                              <div class="separator-vertical-bottom-right"></div>
                            </div>
                              ` : ''}
                                ${anneAnneAnneBaba ? `
                                    <div class="great-great-grandparent">
                                        <div class="connection-line"></div>
                                       <div class="title">Anne Anne Anne Baba: ${anneAnneAnneBaba.ad}</div>
                                         <div class="distance">Kategori: ${anneAnneAnneBaba.category}</div>
                                         <div class="reward">Cinsiyet: ${anneAnneAnneBaba.cinsiyet}</div>
                                         <div class="reward">Kan Hattı: ${anneAnneAnneBaba.kan_hatti}</div>
                                          <div class="reward">Renk: ${anneAnneAnneBaba.renk}</div>
                                         <div class="note">Sahip: ${anneAnneAnneBaba.sahip}</div>
                                   </div>
                                     <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                             <div class="separator-vertical-bottom-left"></div>
                              <div class="separator-vertical-bottom-right"></div>
                            </div>
                               ` : ''}
                      ` : ''}
                        ${anneAnneBaba ? `
                                 ${anneAnneBabaAnne ? `
                                      <div class="great-great-grandparent">
                                             <div class="connection-line"></div>
                                        <div class="title">Anne Anne Baba Anne: ${anneAnneBabaAnne.ad}</div>
                                         <div class="distance">Kategori: ${anneAnneBabaAnne.category}</div>
                                            <div class="reward">Cinsiyet: ${anneAnneBabaAnne.cinsiyet}</div>
                                         <div class="reward">Kan Hattı: ${anneAnneBabaAnne.kan_hatti}</div>
                                          <div class="reward">Renk: ${anneAnneBabaAnne.renk}</div>
                                           <div class="note">Sahip: ${anneAnneBabaAnne.sahip}</div>
                                     </div>
                                       <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                             <div class="separator-vertical-bottom-left"></div>
                              <div class="separator-vertical-bottom-right"></div>
                            </div>
                                 ` : ''}
                                   ${anneAnneBabaBaba ? `
                                       <div class="great-great-grandparent">
                                           <div class="connection-line"></div>
                                         <div class="title">Anne Anne Baba Baba: ${anneAnneBabaBaba.ad}</div>
                                          <div class="distance">Kategori: ${anneAnneBabaBaba.category}</div>
                                           <div class="reward">Cinsiyet: ${anneAnneBabaBaba.cinsiyet}</div>
                                         <div class="reward">Kan Hattı: ${anneAnneBabaBaba.kan_hatti}</div>
                                          <div class="reward">Renk: ${anneAnneBabaBaba.renk}</div>
                                          <div class="note">Sahip: ${anneAnneBabaBaba.sahip}</div>
                                      </div>
                                        <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                             <div class="separator-vertical-bottom-left"></div>
                              <div class="separator-vertical-bottom-right"></div>
                            </div>
                                 `: ''}
                          ` : ''}
                        ${anneBabaAnne ? `
                               ${anneBabaAnneAnne ? `
                                    <div class="great-great-grandparent">
                                        <div class="connection-line"></div>
                                        <div class="title">Anne Baba Anne Anne: ${anneBabaAnneAnne.ad}</div>
                                           <div class="distance">Kategori: ${anneBabaAnneAnne.category}</div>
                                             <div class="reward">Cinsiyet: ${anneBabaAnneAnne.cinsiyet}</div>
                                            <div class="reward">Kan Hattı: ${anneBabaAnneAnne.kan_hatti}</div>
                                             <div class="reward">Renk: ${anneBabaAnneAnne.renk}</div>
                                             <div class="note">Sahip: ${anneBabaAnneAnne.sahip}</div>
                                     </div>
                                       <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                             <div class="separator-vertical-bottom-left"></div>
                              <div class="separator-vertical-bottom-right"></div>
                            </div>
                                 ` : ''}
                                  ${anneBabaAnneBaba ? `
                                      <div class="great-great-grandparent">
                                           <div class="connection-line"></div>
                                         <div class="title">Anne Baba Anne Baba: ${anneBabaAnneBaba.ad}</div>
                                          <div class="distance">Kategori: ${anneBabaAnneBaba.category}</div>
                                            <div class="reward">Cinsiyet: ${anneBabaAnneBaba.cinsiyet}</div>
                                         <div class="reward">Kan Hattı: ${anneBabaAnneBaba.kan_hatti}</div>
                                         <div class="reward">Renk: ${anneBabaAnneBaba.renk}</div>
                                          <div class="note">Sahip: ${anneBabaAnneBaba.sahip}</div>
                                      </div>
                                        <div class="separator-container">
                            <div class="separator-vertical-top"></div>
                            <div class="separator-horizontal"></div>
                             <div class="separator-vertical-bottom-left"></div>
                              <div class="separator-vertical-bottom-right"></div>
                            </div>
                                 ` : ''}
                           ` : ''}
                        ${anneBabaBaba ? `
                               ${anneBabaBabaAnne ? `
                                    <div class="great-great-grandparent">
                                         <div class="connection-line"></div>
                                         <div class="title">Anne Baba Baba Anne: ${anneBabaBabaAnne.ad}</div>
                                          <div class="distance">Kategori: ${anneBabaBabaAnne.category}</div>
                                             <div class="reward">Cinsiyet: ${anneBabaBabaAnne.cinsiyet}</div>
                                          <div class="reward">Kan Hattı
                                          <div class="reward">Renk: ${anneBabaBabaAnne.renk}</div>
                                     <div class="note">Sahip: ${anneBabaBabaAnne.sahip}</div>
                                </div>
                                  <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                           ` : ''}
                           ${anneBabaBabaBaba ? `
                                  <div class="great-great-grandparent">
                                       <div class="connection-line"></div>
                                    <div class="title">Anne Baba Baba Baba: ${anneBabaBabaBaba.ad}</div>
                                     <div class="distance">Kategori: ${anneBabaBabaBaba.category}</div>
                                       <div class="reward">Cinsiyet: ${anneBabaBabaBaba.cinsiyet}</div>
                                    <div class="reward">Kan Hattı: ${anneBabaBabaBaba.kan_hatti}</div>
                                     <div class="reward">Renk: ${anneBabaBabaBaba.renk}</div>
                                    <div class="note">Sahip: ${anneBabaBabaBaba.sahip}</div>
                                </div>
                                  <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                           ` : ''}
                    ` : ''}
                     ${babaAnneAnne ? `
                            ${babaAnneAnneAnne ? `
                                 <div class="great-great-grandparent">
                                       <div class="connection-line"></div>
                                     <div class="title">Baba Anne Anne Anne: ${babaAnneAnneAnne.ad}</div>
                                      <div class="distance">Kategori: ${babaAnneAnneAnne.category}</div>
                                       <div class="reward">Cinsiyet: ${babaAnneAnneAnne.cinsiyet}</div>
                                    <div class="reward">Kan Hattı: ${babaAnneAnneAnne.kan_hatti}</div>
                                     <div class="reward">Renk: ${babaAnneAnneAnne.renk}</div>
                                     <div class="note">Sahip: ${babaAnneAnneAnne.sahip}</div>
                                </div>
                                    <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                            ` : ''}
                             ${babaAnneAnneBaba ? `
                                 <div class="great-great-grandparent">
                                      <div class="connection-line"></div>
                                    <div class="title">Baba Anne Anne Baba: ${babaAnneAnneBaba.ad}</div>
                                     <div class="distance">Kategori: ${babaAnneAnneBaba.category}</div>
                                      <div class="reward">Cinsiyet: ${babaAnneAnneBaba.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${babaAnneAnneBaba.kan_hatti}</div>
                                    <div class="reward">Renk: ${babaAnneAnneBaba.renk}</div>
                                     <div class="note">Sahip: ${babaAnneAnneBaba.sahip}</div>
                                </div>
                                   <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                            ` : ''}
                      ` : ''}
                     ${babaAnneBaba ? `
                           ${babaAnneBabaAnne ? `
                                <div class="great-great-grandparent">
                                      <div class="connection-line"></div>
                                 <div class="title">Baba Anne Baba Anne: ${babaAnneBabaAnne.ad}</div>
                                   <div class="distance">Kategori: ${babaAnneBabaAnne.category}</div>
                                      <div class="reward">Cinsiyet: ${babaAnneBabaAnne.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${babaAnneBabaAnne.kan_hatti}</div>
                                    <div class="reward">Renk: ${babaAnneBabaAnne.renk}</div>
                                    <div class="note">Sahip: ${babaAnneBabaAnne.sahip}</div>
                               </div>
                                  <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                          ` : ''}
                            ${babaAnneBabaBaba ? `
                                <div class="great-great-grandparent">
                                    <div class="connection-line"></div>
                                   <div class="title">Baba Anne Baba Baba: ${babaAnneBabaBaba.ad}</div>
                                    <div class="distance">Kategori: ${babaAnneBabaBaba.category}</div>
                                      <div class="reward">Cinsiyet: ${babaAnneBabaBaba.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${babaAnneBabaBaba.kan_hatti}</div>
                                  <div class="reward">Renk: ${babaAnneBabaBaba.renk}</div>
                                    <div class="note">Sahip: ${babaAnneBabaBaba.sahip}</div>
                                </div>
                                     <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                           ` : ''}
                     ` : ''}
                      ${babaBabaAnne ? `
                            ${babaBabaAnneAnne ? `
                                 <div class="great-great-grandparent">
                                      <div class="connection-line"></div>
                                     <div class="title">Baba Baba Anne Anne: ${babaBabaAnneAnne.ad}</div>
                                      <div class="distance">Kategori: ${babaBabaAnneAnne.category}</div>
                                       <div class="reward">Cinsiyet: ${babaBabaAnneAnne.cinsiyet}</div>
                                    <div class="reward">Kan Hattı: ${babaBabaAnneAnne.kan_hatti}</div>
                                   <div class="reward">Renk: ${babaBabaAnneAnne.renk}</div>
                                    <div class="note">Sahip: ${babaBabaAnneAnne.sahip}</div>
                                </div>
                                  <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                           ` : ''}
                           ${babaBabaAnneBaba ? `
                                <div class="great-great-grandparent">
                                      <div class="connection-line"></div>
                                   <div class="title">Baba Baba Anne Baba: ${babaBabaAnneBaba.ad}</div>
                                    <div class="distance">Kategori: ${babaBabaAnneBaba.category}</div>
                                      <div class="reward">Cinsiyet: ${babaBabaAnneBaba.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${babaBabaAnneBaba.kan_hatti}</div>
                                    <div class="reward">Renk: ${babaBabaAnneBaba.renk}</div>
                                     <div class="note">Sahip: ${babaBabaAnneBaba.sahip}</div>
                                </div>
                                   <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                           `: ''}
                     ` : ''}
                   ${babaBabaBaba ? `
                           ${babaBabaBabaAnne ? `
                                <div class="great-great-grandparent">
                                      <div class="connection-line"></div>
                                  <div class="title">Baba Baba Baba Anne: ${babaBabaBabaAnne.ad}</div>
                                   <div class="distance">Kategori: ${babaBabaBabaAnne.category}</div>
                                      <div class="reward">Cinsiyet: ${babaBabaBabaAnne.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${babaBabaBabaAnne.kan_hatti}</div>
                                    <div class="reward">Renk: ${babaBabaBabaAnne.renk}</div>
                                    <div class="note">Sahip: ${babaBabaBabaAnne.sahip}</div>
                                </div>
                                     <div class="separator-container">
                      <div class="separator-vertical-top"></div>
                      <div class="separator-horizontal"></div>
                       <div class="separator-vertical-bottom-left"></div>
                        <div class="separator-vertical-bottom-right"></div>
                      </div>
                           ` : ''}
                          ${babaBabaBabaBaba ? `
                                <div class="great-great-grandparent">
                                     <div class="connection-line"></div>
                                    <div class="title">Baba Baba Baba Baba: ${babaBabaBabaBaba.ad}</div>
                                     <div class="distance">Kategori: ${babaBabaBabaBaba.category}</div>
                                      <div class="reward">Cinsiyet: ${babaBabaBabaBaba.cinsiyet}</div>
                                   <div class="reward">Kan Hattı: ${babaBabaBabaBaba.kan_hatti}</div>
                                    <div class="reward">Renk: ${babaBabaBabaBaba.renk}</div>
                                     <div class="note">Sahip: ${babaBabaBabaBaba.sahip}</div>
                                </div>
                                <div class="separator-container">
                                <div class="separator-vertical-top"></div>
                                <div class="separator-horizontal"></div>
                                </div>
                                    ` : ''}
                                ` : ''}
                    </div>
                    </div>
                    </body>
                </html>
                `;

                return htmlContent;
            } catch (error) {
                console.error("HTML oluşturulurken hata:", error);
                return "<p>Soy ağacı bilgisi oluşturulurken bir hata oluştu.</p>";
            }
    };
    const handlePrint = async (kunyeNo) => {
        setLoading(true);
        try {
            const html = await generateSoyAgaciHTML(kunyeNo);
            if (html) {
                setPrintHTML(html);
                setIsModalVisible(true);
            } else {
                Alert.alert("Hata", "Yazdırma işlemi için HTML oluşturulamadı.");
            }
        } catch (error) {
            console.error("Yazdırma hatası:", error);
            Alert.alert("Hata", "Yazdırma işlemi sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleWebViewLoad = (kunyeNo) => {
        /*
         Alert.alert(
          'Yazdırma',
          `"${kunyeNo}" künyeli kuşun soy ağacını yazdırmak istiyor musunuz?`,
          [
            {
              text: 'Vazgeç',
              style: 'cancel',
              onPress: () => setIsModalVisible(false)
            },
            {
              text: 'Yazdır',
              onPress: () => setIsModalVisible(false)
            },
          ],
        );
      */
    };

    const fetchKusByKunyeNo = async (kunyeNo, collectionName) => {
      try {
          const q = query(collection(db, collectionName), where("kunye_no", "==", kunyeNo));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
              return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id };
          } else {
              return null;
          }
      } catch (error) {
          console.error("fetchKusByKunyeNo hatası:", error);
          return null;
      }
  };
    const fetchChildrenByParents = async (anne_adi, baba_adi) => {
        try {
            const femaleRef = collection(db, "female_bird");
            const maleRef = collection(db, "male_bird");

            const qFemale = query(femaleRef, where("anne_adi", "==", anne_adi), where("baba_adi", "==", baba_adi));
            const qMale = query(maleRef, where("anne_adi", "==", anne_adi), where("baba_adi", "==", baba_adi));

            const femaleSnapshot = await getDocs(qFemale);
            const maleSnapshot = await getDocs(qMale);

            const children = [];
            femaleSnapshot.forEach((doc) => children.push({ ...doc.data(), id: doc.id }));
            maleSnapshot.forEach((doc) => children.push({ ...doc.data(), id: doc.id }));

            return children;
        } catch (error) {
            console.error("fetchChildrenByParents hatası:", error);
            return [];
        }
    };
    const generateSoyAgaciData = async (kunyeNo) => {
        setLoading(true);
        try {
            const rootKus = await fetchKusByKunyeNo(kunyeNo, "female_bird");
            if (!rootKus) {
                return [];
            }
            const soyAgaciList = [];

            const recursiveFetch = async (currentKus, level = 0) => {
                const item = { ...currentKus, level };
                soyAgaciList.push(item);

                const anne = await fetchKusByKunyeNo(currentKus.anne_adi, "female_bird");
                if (anne) item.anne = await recursiveFetch(anne, level + 1);

                const baba = await fetchKusByKunyeNo(currentKus.baba_adi, "male_bird");
                if (baba) item.baba = await recursiveFetch(baba, level + 1);

                // Çocuklar ile ilgilen
                const children = await fetchChildrenByParents(currentKus.anne_adi, currentKus.baba_adi);
                if (children.length > 0) {
                    for (const child of children) {
                        await recursiveFetch(child, level + 1);
                    }
                }
                return item;
            };

            await recursiveFetch(rootKus);

            setLoading(false);
            return soyAgaciList;
        } catch (error) {
            console.error("Soy ağacı oluşturma hatası:", error);
            setLoading(false);
            return [];
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <WebView
                        source={{ html: printHTML }}
                        onLoad={() => handleWebViewLoad(selectedKus)}
                    />
                </View>
            </Modal>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Ad</DataTable.Title>
                    <DataTable.Title>Anne Ad</DataTable.Title>
                    <DataTable.Title>Baba Ad</DataTable.Title>
                    <DataTable.Title>SoyBilgisi</DataTable.Title>
                </DataTable.Header>

                {kuslar.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.ad}</DataTable.Cell>
                        <DataTable.Cell>{item.anne_adi}</DataTable.Cell>
                        <DataTable.Cell>{item.baba_adi}</DataTable.Cell>
                        <DataTable.Cell>
                            <Button title="Goster" onPress={() => handlePrint(item.kunye_no)} />
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
        </View>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'lightgray',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: "90%",
        alignSelf: "center",
      }
});

export default denemeSoyagaci;