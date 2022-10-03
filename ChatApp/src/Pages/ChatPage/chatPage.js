import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, ImageBackground} from 'react-native';
import {db, auth} from '../../../config';
import MessageUnit from '../../Components/MessageUnit/MessageUnit';
import styles from './chatPage.style';
import {useDispatch, useSelector} from 'react-redux';
import ChatPageFooter from '../../Components/ChatPageFooter/ChatPageFooter';
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';

const ChatPage = ({navigation, route}) => {
  const theme = useSelector(state => state.theme.theme);
  const [messages, setMessages] = useState();
  const [chatId, setChatId] = useState();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState(' ');
  const {id} = route.params;
  console.log('receiverıd', id);
  console.log('current', auth.currentUser.uid);

  const getMessages = async () => {
    const chat =
      auth.currentUser.uid > id
        ? auth.currentUser.uid + id
        : id + auth.currentUser.uid;
    await getDoc(doc(db, 'chatRooms', chat)).then(res => {
      const response = res.data();
      console.log('res', response);
      const messagesList = response.messages;
      const chatInfo = response.chat;
      console.log('chatId', chatInfo);
      setChatId(chatInfo);
      console.log(chatId);
      console.log('mlist', messagesList);
      setMessages(messagesList);
    });
  };

  const sendMessage = async () => {
    await updateDoc(doc(db, 'chatRooms', chatId), {
      messages: arrayUnion({
        type: 'text',
        message: newMessage,
        senderId: auth.currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    setNewMessage(null);
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  return (
    <SafeAreaView style={styles.enabledDirection}>
      <View style={styles.container}>
        <ImageBackground
          source={
            theme === 'Light'
              ? require('../../Assets/whiteBackGround.jpg')
              : require('../../Assets/blackBackground.jpg')
          }
          // Imagebackground view is choosed for messaging area.
          resizeMode="cover"
          style={styles.image}>
          <FlatList
            data={messages}
            renderItem={({item}) => (
              <MessageUnit
                message={item.message}
                sender={item.senderId}
                messageType={item.type}
              />
            )}
          />
          <ChatPageFooter
            messageText={newMessage}
            textInputTask={setNewMessage}
            sendIconTask={sendMessage}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
