import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import UserCards from '../../Components/UserCards';
import styles from './messagesList.style';
import {useSelector, useDispatch} from 'react-redux';
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
import {setAllChatRooms} from '../../Management/Features/chatSlice';

const MessagesList = ({navigation}) => {
  // const allUsers = useSelector(state => state.auth.allUsers);
  // const allChats = useSelector(state => state.chat.allChatRooms);
  const dispatch = useDispatch();
  const [messagesList, setMessagesList] = useState();
  const allUsers = useSelector(state => state.auth.allUsers);
  const getChatRooms = async () => {
    const q = query(collection(db, 'chatRooms'));
    await getDocs(q).then(res => {
      const chatRooms = res.docs.map(item => item.data());
      console.log('cRoomss', chatRooms);
      const chatWithMessage = chatRooms.filter(
        item =>
          item.messages.length > 0 &&
          item.chat.indexOf(auth.currentUser.uid) !== -1,
      );
      const activeChats = chatWithMessage.map(function (item) {
        const receiverId =
          item.chat.slice(0, 28) === auth.currentUser.uid
            ? item.chat.slice(28)
            : item.chat.slice(0, 28);
        console.log('id', receiverId);
        const userInfo = allUsers.find(function (elem) {
          return elem.id === receiverId;
        });
        const name = userInfo.name;
        const photoUrl = userInfo.photoUrl;
        const surname = userInfo.surname;
        return {
          chat: name,
          surname: surname,
          id: receiverId,
          photoUrl: photoUrl,
          lastMessage: item.messages[item.messages.length - 1].message,
        };
      });
      console.log('message', activeChats);
      setMessagesList(activeChats);
      // dispatch(setAllChatRooms(chatRooms));
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getChatRooms();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messagesList}
        renderItem={({item}) => (
          <UserCards
            name={item.chat}
            surname={item.surname}
            link={item.photoUrl}
            lastMessage={item.lastMessage}
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
