import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ionicons kullanarak ikonları ekleyeceğiz

const SignupPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("(+90)"); // Başlangıçta +90 sabit olacak
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Üye ol fonksiyonu
  const handleSignUp = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      phone === "(+90)" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
    } else if (password !== confirmPassword) {
      Alert.alert("Hata", "Şifreler uyuşmuyor!");
    } else {
      Alert.alert("Başarıyla Üye Oldunuz!", `Hoş geldiniz, ${firstName}!`);
    }
  };

  const handlePhoneChange = (text) => {
    // Telefon numarasının başına +90 parantez içinde eklenip 10 haneli olması sağlanacak
    const newPhone = text.replace("(+90)", ""); // (+90)'i çıkartıyoruz
    if (newPhone.length <= 15) {
      setPhone(`(+90)${newPhone}`); // Yalnızca 10 rakam girilebilir
    }
  };

  


  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/image/download.jpg')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      

    <View>
    <Text style={styles.title}>Üye Ol</Text>
    </View>
     

    
      <View style={styles.formWrapper}>
        
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Adiniz"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Soyadiniz"
            placeholderTextColor="#888"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="call-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefon (+90)"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={handlePhoneChange}
            maxLength={14} // (+90) ve numara toplamda 14 karakteri geçemez
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifreyi Tekrar Girin"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

  
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Üye Ol</Text>
        </TouchableOpacity>
      </View>

     
      <TouchableOpacity onPress={() => navigation.navigate("Giriş Yap")}>
        <View>
        <Text style={styles.loginText}>
          Zaten hesabınız var mı?{" "}
          <Text style={styles.loginLink}>Giriş Yapın</Text>
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Üstten başlayarak hizala
    alignItems: "center", // Ortalamayı sürdür
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 50,
    paddingTop: 20, // Üstten boşluk, ekranı biraz yukarı al
  },
  logoContainer: {
    marginBottom: 30, // Logo ile başlık arasına biraz daha boşluk
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 60, // Başlık ile input'lar arasına boşluk bırakıyoruz
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    paddingLeft: 15,
  },
  input: {
    width: "85%",
    padding: 1,
    fontSize: 16,
  },
  signupButton: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#4CAF50", // Modern yeşil ton
    borderRadius: 510,
    alignItems: "center",
    marginTop: 20, // Giriş butonunun konumunu biraz yukarı çektik
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    color: "#555",
  },
  loginLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  formWrapper: {
    flex: 1, // Formu ekrana yaymak için
    justifyContent: "center", // Dikey olarak merkezle
    width: "100%",
  },
});

export default SignupPage;


/*
import { StyleSheet,Text,View } from "react-native";
import React from "react";

const SignupPage =()=> {

    return (

        <View style={styles.container}>
            <Text>SignupPage</Text>
            </View>


    )
}

export default SignupPage
const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
}) ;
*/