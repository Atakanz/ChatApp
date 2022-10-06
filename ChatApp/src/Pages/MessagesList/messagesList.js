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

const MessagesList = ({navigation}) => {
  const [messagesList, setMessagesList] = useState();
  const isFocused = useIsFocused();

  const getChatRooms = async () => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;
      const q = query(
        collection(db, 'chatRooms'),
        where('members', 'array-contains', uid),
        orderBy('lastRefresh', 'desc'),
      );
      const chatRooms = await getDocs(q);
      console.log('cRooms', chatRooms);
      const allChatRooms = chatRooms.docs.map(item => item.data());
      const chatWithMessage = allChatRooms.filter(
        item => item.messages.length > 0,
      );
      console.log('active', chatWithMessage);
      const actives = [];
      chatWithMessage.forEach(async function (item) {
        const receiverId =
          item.chat.slice(0, 28) === uid
            ? item.chat.slice(28)
            : item.chat.slice(0, 28);
        const userDocSnap = await getDoc(doc(db, 'users', receiverId));
        console.log('iduser', userDocSnap.data());
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
        console.log('pushed', actives);
        if (actives.length === chatWithMessage.length) {
          setMessagesList(actives);
          console.log('messages', messagesList);
        }
      });
    }
  };
  console.log('after', messagesList);

  useEffect(() => {
    getChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messagesList}
        renderItem={({item}) => (
          <UserCards
            name={item.chat}
            link={item.photoUrl}
            lastMessage={item.lastMessage}
            lastMessageType={item.lastMessageType}
            time={item.date}
            task={() => {
              navigation.navigate('ChatPage', {
                name: item.chat,
                link: item.photoUrl,
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
