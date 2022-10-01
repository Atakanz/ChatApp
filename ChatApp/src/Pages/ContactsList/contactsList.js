import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import styles from './contacts.style';
import {db, auth} from '../../../config';
import {collection, query, where, getDocs, addDoc} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import UserCards from '../../Components/UserCards';
import {useSelector, useDispatch} from 'react-redux';
import {setAllChatRooms} from '../../Management/Features/chatSlice';

const ContactsList = ({navigation}) => {
  const [allUsers, setAllUsers] = useState([]);
  const allChats = useSelector(state => state.chat.allChatRooms);
  const dispatch = useDispatch();
  const getData = async () => {
    const q = query(
      collection(db, 'users'),
      where('id', '!=', auth.currentUser.uid),
    );
    await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      console.log('user', _users);
      setAllUsers(_users);
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
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
              const isExist = allChats.some(function (elem) {
                return (
                  (elem[0] === auth.currentUser.uid && elem[1] === item.id) ||
                  (elem[0] === item.id && elem[1] === auth.currentUser.uid)
                );
              });
              if (isExist === false) {
                addDoc(collection(db, 'chatRooms'), {
                  members: {member1: auth.currentUser.uid, member2: item.id},
                  messages: [],
                }).then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  dispatch(setAllChatRooms([auth.currentUser.uid, item.id]));
                });
              }
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ContactsList;
