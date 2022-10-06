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
  arrayUnion,
} from 'firebase/firestore';

import UserCards from '../../Components/UserCards';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setAllChatRooms} from '../../Management/Features/chatSlice';

const ContactsList = () => {
  const [searched, setSearched] = useState([]);
  const [foundUser, setFoundUser] = useState([]);
  const allChats = useSelector(state => state.chat.allChatRooms);
  // const allUsers = useSelector(state => state.auth.allUsers);
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

  const dispatch = useDispatch();

  const getUsers = async () => {
    const q = query(collection(db, 'users'), where('username', '==', searched));
    await getDocs(q).then(res => {
      const _user = res.docs.map(item => item.data());
      setFoundUser(_user);
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
    getChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searched]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foundUser}
        renderItem={({item}) => (
          <UserCards
            name={item.username}
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
