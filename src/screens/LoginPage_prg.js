
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Loading from '../components/Loading';


const LoginPage_org = ({navigation}) => {
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
           

  return (
    <View style={styles.container}>
      

                      

      






      <Text>Hoş Geldin {result}</Text>
      <Text>Kullanıcı adı</Text>
      <TextInput
        keyboardType='email-address'
        style={styles.textInputStyle}
        placeholder='Kullanıcı adı giriniz'
        onChangeText={setName}
        value={name}
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Text>Şifre</Text>
      <TextInput
        placeholder='Şifrenizi giriniz'
        style={styles.textInputStyle}
        onChangeText={setLastname}
        value={lastName}
        secureTextEntry={true}
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Pressable 
        onPress={() => setIsLoading(true)}
        style={({ pressed }) => [{ backgroundColor: pressed ? "gray" : 'blue' }, styles.button]}>
        <Text style={styles.buttonText}>GİRİŞ</Text>
      </Pressable>

      
      <Pressable 
        onPress={() => navigation.navigate('SignupPage')}
        style={({ pressed }) => [{ backgroundColor: pressed ? "gray" : 'lightgray', marginTop:10
         }, styles.kayitOlButton]}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.navigate('Tanitim')}
        style={({ pressed }) => [{ backgroundColor: pressed ? "gray" : 'lightgray', marginTop:10     //deneme Tanıtım sayfası 
         }, styles.tanitimButton]}>
        <Text style={styles.buttonText}>Tanıtım</Text>
      </Pressable>



      {isLoading ? <Loading changeIsLoading={() => setIsLoading(false)} /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

export default LoginPage_org;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD7D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    borderWidth: 1,
    width: '80%',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: 'center'
  },
  button: {
    borderWidth: 1,
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kayitOlButton:{
    borderWidth: 1,
    width: '30%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',

  },

    tanitimButton:{
    borderWidth: 1,
    width: '70%',                        //deneme ekran
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    },

    image:{
      width:100,
      height:100,
      


    }


});

/*
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text,
  View,
  TextInput,
  Pressable,
  Button,
   } from 'react-native';

   import React, {useState} from 'react';
   import Loading from '../components/Loading'

const LoginPage =()=> {
  const [name,setName] = useState("")
  const [lastName,setLastname] = useState("")
  const [result,setResult] =useState('');
  const [isLoading,setIsLoading]=useState(false)

  return (
    <View style={styles.container}>
      <Text>Hos Geldin {result}</Text>
      <Text>Kullanıcı adı</Text>
      <TextInput
      inputMode='email'
      style={styles.textInputStyle}
      placeholder='Kullanıcı adı giriniz'
      onChangeText={setName}
      value={name}
      />
      <Text>Şifre</Text>
      <TextInput
      placeholder='şifrenizi giriniz'
      style={styles.textInputStyle}
      onChangeText={setLastname}
      value={lastName}
      secureTextEntry={true}
      />
      <Pressable 
        onPress={()=>setIsLoading(true)}
        style={({pressed}) => [{backgroundColor:pressed ?"gray": 'blue'},styles.button]}>
        <Text style={styles.buttonText}> GİRİS</Text>
      </Pressable>
        {isLoading ? <Loading name="" changeIsLoading={()=>setIsLoading(false)}/> :null }
      <StatusBar style="auto" />
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textInputStyle:{
    borderWidth:1,
    width:'80%',
    height:50,
    borderRadius:10,
    marginVertical:10,
    textAlign:'center'
  },

  button: {
    borderWidth:1,
    width:'80%',
    height:50,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    

  },

  buttonText:{
    fontWeight:'bold',
    color:'white',

  }
  

  

  
});

*/