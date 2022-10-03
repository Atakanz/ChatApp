import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import styles from './contacts.style';
import {db, auth} from '../../../config';
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import UserCards from '../../Components/UserCards';
import {useSelector, useDispatch} from 'react-redux';
import {setAllChatRooms} from '../../Management/Features/chatSlice';
import {setAllUsers} from '../../Management/Features/userSlice';

const ContactsList = ({navigation}) => {
  const allChats = useSelector(state => state.chat.allChatRooms);
  const allUsers = useSelector(state => state.auth.allUsers);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getUsers = async () => {
    const q = query(
      collection(db, 'users'),
      where('id', '!=', auth.currentUser.uid),
    );
    await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      console.log('user', _users);
      dispatch(setAllUsers(_users));
      console.log('allusers', allUsers);
    });
  };
  const getChatRooms = async () => {
    const q = query(collection(db, 'chatRooms'));
    await getDocs(q).then(res => {
      const chatRooms = res.docs.map(item => item.data());
      console.log('cRooms', chatRooms);
      dispatch(setAllChatRooms(chatRooms));
    });
  };

  const setChatRoom = receiverId => {
    const chatId =
      auth.currentUser.uid > receiverId
        ? auth.currentUser.uid + receiverId
        : receiverId + auth.currentUser.uid;
    const isExist = allChats.some(function (elem) {
      return elem?.chat === chatId;
    });
    if (isExist === false) {
      setDoc(doc(db, 'chatRooms', chatId), {
        messages: [],
        chat: chatId,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers();
      getChatRooms();
      console.log('dispatch', allChats);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allUsers}
        renderItem={({item}) => (
          <UserCards
            name={item.name}
            surname={item.surname}
            link={item.photoUrl}
            task={() => {
              navigation.navigate('ChatPage', {
                name: item.name,
                link: item.photoUrl,
                id: item.id,
              });
              setChatRoom(item.id);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ContactsList;
