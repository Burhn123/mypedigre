import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import React, { useState } from "react";
  
  const Iletisim = () => {
    const [konu, setKonu] = useState("");
    const [email, setEmail] = useState("");
    const [mesaj, setMesaj] = useState("");
  
    const handleSend = () => {
      alert(`Konu: ${konu}\nE-Posta: ${email}\nMesaj: ${mesaj}`);
      setKonu("");
      setEmail("");
      setMesaj("");
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{ flex: 1 }} // Burada flex: 1 ekleyerek tüm alanı kaplamasını sağlıyoruz
            behavior={Platform.OS === "android" ? "padding" : "height"}
          >
            <Image
              source={require('../../assets/adaptive-icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
  
            <Text style={styles.headerText}>Bizimle İletişime Geçin</Text>
  
            <TextInput
              style={styles.input}
              placeholder="Konu"
              value={konu}
              onChangeText={setKonu}
            />
  
            <TextInput
              style={styles.input}
              placeholder="E-Posta"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
  
            <TextInput
              style={styles.textArea} // Değişiklik yapıldı
              placeholder="Mesaj"
              value={mesaj}
              onChangeText={setMesaj}
              multiline
              scrollEnabled // Kaydırma özelliği ekleniyor
            />
  
            <Pressable style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Gönder</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      justifyContent: "center",
    },
    logo: {
      width: 300,
      height: 120,
      marginBottom: 50,
      alignSelf: "center",
    },
    headerText: {
      fontSize: 40,
      fontWeight: "bold",
      marginBottom: 60,
      textAlign: "center",
      color: "#000", // Yazıyı koyulaştırdık
    },
    input: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontWeight: "bold", // Koyu yazı
    },
    textArea: {
      // Yeni stil eklendi
      height: 100, // Yüksekliği artırdık
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontWeight: "bold", // Koyu yazı
      textAlignVertical: "top", // Metni yukarı hizalama
    },
    button: {
      backgroundColor: "#007AFF",
      borderColor: "#0056b3",
      borderWidth: 2,
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  
  export default Iletisim;
  