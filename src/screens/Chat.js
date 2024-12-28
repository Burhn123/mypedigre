import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot, Timestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebaseConfig';  // Firebase yapılandırmanız
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // Çıkış yapma fonksiyonu
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  // Header sağ üst köşe çıkış butonu
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={'gray'} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Firestore'dan mesajları almak
  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const newMessages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()  // createdAt doğru formatta mı?
          : new Date();  // Eğer değilse, geçerli tarihi kullan

        return {
          _id: data._id || Math.random().toString(36).substr(2, 9), // _id eksikse rastgele bir ID oluştur
          createdAt,
          text: data.text,
          user: {
            _id: data.user?._id || 'guest',  // user._id eksikse 'guest' kullan
            avatar: data.user?.avatar || 'https://i.pravatar.cc/300', // avatar eksikse varsayılan avatar kullan
          },
        };
      });

      setMessages(newMessages); // Mesajları state'e kaydediyoruz
    });

    return unsubscribe;  // Cleanup
  }, []);

  // Mesaj gönderme fonksiyonu
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );

    const { createdAt, text, user } = messages[0];
    const userId = auth?.currentUser?.email || 'guest';  // Kullanıcı ID'si, eğer oturum açılmadıysa 'guest' kullanılır

    addDoc(collection(db, 'chats'), {
      createdAt: Timestamp.fromDate(new Date()), // Timestamp kullanımı
      text,
      user: {
        _id: userId,  // Burada kullanıcı ID'si 'guest' olacaksa, Firebase hatası oluşmaz
        avatar: 'https://i.pravatar.cc/300',  // Varsayılan avatar
      },
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email || 'guest',  // Kullanıcı e-posta adresi veya 'guest'
        avatar: 'https://i.pravatar.cc/300',  // Varsayılan avatar
      }}
    />
  );
}
