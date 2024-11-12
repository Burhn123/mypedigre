/*import { StyleSheet,Text,View,Image } from "react-native";
import React from "react";



const Tanitim =()=> {

    return (

        <View style={styles.container}>

            <Text>Tanitim</Text>
            </View>

    )
}

export default Tanitim
const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },

    image: {

        width:100,
        height:100,
        

    }
    
})
*/
import { Pressable, StyleSheet,Text,View } from "react-native";
import React from "react";

const Tanitim =({navigation})=> {
    const handlePress = () => {
        //navigation.navigate("İletişim"); // "İletişim" ekranına yönlendirme
        navigation.navigate('Signup')
      };
    return (
    <View style={styles.container}>
    {/* Logo */}
  

    {/* Büyük ve kalın yazı */}
    <Text style={styles.headerText}>Hizmetlerimiz</Text>

    {/* Açıklama metni */}
    <Text style={styles.descriptionText}>
      En Kolay Sekilde Dünyanın Her Yerinden Pedigrelerinizi Oluşturun ve
      Görüntüleyin.
    </Text>

    {/* Boşluk bırakarak ikinci açıklama cümlesi */}
    <Text style={styles.descriptionText}>
      Artık Tüm Pedigrelerinizi Cep Telefonundan, Tabletten, Bilgisayardan
      Ulaşabilir ve İndirebilirsiniz.
    </Text>

    <Pressable 
        onPress={() => navigation.navigate('Iletisim')}
        style={({ pressed }) => [{ backgroundColor: pressed ? "gray" : 'lightgray', marginTop:10
         }, styles.kayitOlButton]}>
        <Text style={styles.contactText}>Bize Ulaşın 2</Text>
      </Pressable>
    {/* En alttaki "Bize Ulaşın" linki */}
    <Pressable  onPress={() => navigation.navigate('Signup')}>
      <Text style={styles.contactText}>Bize Ulaşın</Text>
    </Pressable>
  
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "space-between",
},
logo: {
  width: 400, // Logonun genişliği artırıldı
  height: 150, // Logonun yüksekliği artırıldı
  marginBottom: -80, // Logo ile başlık arasındaki boşluk
},
headerText: {
  fontSize: 50, // Başlığı büyütüyoruz
  fontWeight: "bold",
  marginBottom: 20, // Başlık ve açıklama metni arasındaki boşluk
  textAlign: "center",
},
descriptionText: {
  fontSize: 25, // Orta büyüklükte yazı
  fontWeight: "bold", // Kalın yazı
  textAlign: "center",
  lineHeight: 24,
  marginBottom: 4, // İki açıklama metni arasındaki boşluk daha da azaltıldı
},
contactText: {
  fontSize: 16,
  color: "#007AFF",
  textDecorationLine: "underline",
  fontWeight: "bold", // Kalın yazı
},
});

export default Tanitim;