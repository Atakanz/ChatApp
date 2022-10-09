import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import UserCards from '../../Components/UserCards';
import styles from './messagesList.style';
import {db, auth} from '../../../config';
import {
  orderBy,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';

const MessagesList = ({navigation}) => {
  const theme = useSelector(state => state.theme.theme);
  const [messagesList, setMessagesList] = useState();
  const [userId, setUserId] = useState();
  const isFocused = useIsFocused();
  const user = useSelector(state => state.auth.user);
  const getChatRooms = async () => {
    let uid = user.id;
    const q = query(
      collection(db, 'chatRooms'),
      where('members', 'array-contains', uid),
      orderBy('lastRefresh', 'desc'),
    );
    const chatRooms = await getDocs(q);
    const allChatRooms = chatRooms.docs.map(item => item.data());
    const chatWithMessage = allChatRooms.filter(
      item => item.messages.length > 0,
    );
    const actives = [];
    chatWithMessage.forEach(async function (item) {
      const receiverId =
        item.chat.slice(0, 28) === uid
          ? item.chat.slice(28)
          : item.chat.slice(0, 28);
      const userDocSnap = await getDoc(doc(db, 'users', receiverId));
      const rooms = {
        chat: userDocSnap.data().name,
        surname: userDocSnap.data().surname,
        id: receiverId,
        photoUrl: userDocSnap.data().photoUrl,
        lastMessage: item.messages[item.messages.length - 1].message,
        lastMessageType: item.messages[item.messages.length - 1].type,
        date: item.messages[item.messages.length - 1].date,
      };
      actives.push(rooms);
      if (actives.length === chatWithMessage.length) {
        setMessagesList(actives);
      }
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isFocused, user]);

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <FlatList
        data={messagesList}
        renderItem={({item}) => (
          <UserCards
            name={item.chat}
            photoUrl={item.photoUrl}
            lastMessage={item.lastMessage}
            lastMessageType={item.lastMessageType}
            time={item.date}
            task={() => {
              navigation.navigate('ChatPage', {
                name: item.chat,
                photoUrl: item.photoUrl,
                id: item.id,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MessagesList;
