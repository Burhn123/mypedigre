import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setLogin, login } from '../redux/userSlice';
import Loading from '../components/Loading';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ email, password }));
    if (error) {
      Alert.alert(error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/008/086/non_2x/background-dimension-3d-graphic-message-board-for-text-and-message-design-line-shadow-for-modern-web-design-free-vector.jpg' }}  // Arka plan resmi
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Hoş Geldin</Text>
        
        <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Kullanıcı adı giriniz"
          onChangeText={(text) => setEmail(text)}
          value={email || ""}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <Text style={styles.inputLabel}>Şifre</Text>
        <TextInput
          placeholder="Şifrenizi giriniz"
          style={styles.textInputStyle}
          onChangeText={(text) => setPassword(text)}
          value={password || ""}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#4f81bd" : "#006b93" },
            styles.button
          ]}
        >
          <Text style={styles.buttonText}>GİRİŞ</Text>
        </Pressable>

        {/* Kayıt Ol Butonu */}
        <Pressable
          onPress={() => navigation.navigate("kayitOl")}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#ff8a00" : "#f57c00" },
            styles.registerButton
          ]}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </Pressable>

        {isLoading && <Loading />}
        
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',  // Fotoğrafın ekranda tam görünmesi için
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',  // İçeriğin net görünmesi için sayfa elemanlarına opaklık ekledik
    borderRadius: 15,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#006b93',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  registerButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});
