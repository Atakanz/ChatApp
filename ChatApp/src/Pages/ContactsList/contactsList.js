import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import styles from './contactsList.style';
import {db, auth} from '../../../config';
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import UserCards from '../../Components/UserCards';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ContactsList = () => {
  const theme = useSelector(state => state.theme.theme);
  const [searched, setSearched] = useState([]);
  const [foundUser, setFoundUser] = useState([]);
  const allChats = useSelector(state => state.chat.allChatRooms);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search friends',
        onChangeText: event => {
          searchFilterFunction(event.nativeEvent.text);
        },
      },
    });
  });

  const searchFilterFunction = text => {
    if (text) {
      setSearched(text);
    }
  };

  const getUsers = async () => {
    const q = query(collection(db, 'users'), where('username', '==', searched));
    await getDocs(q).then(res => {
      const _user = res.docs.map(item => item.data());
      setFoundUser(_user);
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
        members: [receiverId, auth.currentUser.uid],
      });
      updateDoc(doc(db, 'users', auth.currentUser.uid), {
        friends: arrayUnion({
          friendId: receiverId,
        }),
      });
      updateDoc(doc(db, 'users', receiverId), {
        friends: arrayUnion({
          friendId: auth.currentUser.uid,
        }),
      });
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searched]);

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <FlatList
        data={foundUser}
        renderItem={({item}) => (
          <UserCards
            name={item.username}
            photoUrl={item.photoUrl}
            task={() => {
              navigation.navigate('ChatPage', {
                name: item.name,
                photoUrl: item.photoUrl,
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
