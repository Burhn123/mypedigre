import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Hakkimizda = () => {
  // Sosyal medya bağlantıları
  const socialLinks = {
    facebook: "https://www.facebook.com/yourpage",
    instagram: "https://www.instagram.com/cnkrcx",
    twitter: "https://x.com/cnkrcxx",
    youtube: "https://www.youtube.com/@Softrex0", // Güncel bağlantı
    email: "can-f-rac@hotmail.com",
  };

  // Yönlendirme işlevi
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Logo */}
        
        

        {/* Açıklama metni */}
        <View>
        <Text style={styles.description}>
          2016 yılında resmi olarak başlamış olduğumuz bu serüvene bir sevgi ve
          tutku ile nasıl daha iyisini yapabiliriz diye sürekli sınırlarımızı
          zorladık, sizlerin desteği ile ailemizi sürekli büyüttük ve büyütmeye
          de devam etmekteyiz. Günümüz itibarı ile organizasyon olarak
          ülkemizdeki en prestijli kuruluş olmayı başardık. Dünya çapında
          organizasyon ve kapasite olarak en büyüklerden biriyiz. Derby16 FCI
          Grandprix'te yarışmak bir ayrıcalıktır...
        </Text>
        </View>
       

        {/* Sosyal medya ikonları */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => openLink(socialLinks.facebook)}>
            <Ionicons
              name="logo-facebook"
              size={30}
              color="#4267B2"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(socialLinks.instagram)}>
            <Ionicons
              name="logo-instagram"
              size={30}
              color="#E1306C"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(socialLinks.twitter)}>
            <Ionicons
              name="logo-twitter"
              size={30}
              color="#1DA1F2"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(socialLinks.youtube)}>
            <Ionicons
              name="logo-youtube"
              size={30}
              color="#FF0000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(socialLinks.email)}>
            <Ionicons
              name="mail-outline"
              size={30}
              color="#000000"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#8C7D8C",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 220, // Logo büyütüldü
    height: 220,
    marginBottom: 20,
  },
  description: {
    fontSize: 23, // Yazı büyütüldü
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 70, // İkonlar daha aşağıda
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Hakkimizda;
