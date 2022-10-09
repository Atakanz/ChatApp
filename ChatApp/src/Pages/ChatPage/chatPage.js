import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ImageBackground,
  Modal,
  Alert,
  Image,
} from 'react-native';
import {db, auth} from '../../../config';
import MessageUnit from '../../Components/MessageUnit/MessageUnit';
import styles from './chatPage.style';
import {useSelector} from 'react-redux';
import Attachment from '../../Components/Attachment/Attachment';
import usePickImage from '../../Hooks/pickImageFromGallery';
import useUploadImage from '../../Hooks/xmlhttpRequest';
import useTakePhoto from '../../Hooks/takePhoto';
import Buttons from '../../Components/Buttons';
import * as Location from 'expo-location';
import ChatPageFooter from '../../Components/ChatPageFooter/ChatPageFooter';
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';

const ChatPage = ({navigation, route}) => {
  const theme = useSelector(state => state.theme.theme);
  const [messages, setMessages] = useState();
  const [chatId, setChatId] = useState();
  const [newMessage, setNewMessage] = useState(' ');
  const {id} = route.params;

  const [attachModalVisible, setAttachModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [filePath, setFilePath] = useState('');
  const {pickImage} = usePickImage();
  const {uploadImage} = useUploadImage();
  const {takePhoto} = useTakePhoto();

  const selectGallery = () => {
    pickImage().then(res => {
      if (res !== undefined) {
        setFilePath(res);
        setImageModalVisible(true);
      }
      setAttachModalVisible(false);
    });
  };

  const getMessages = async () => {
    const chat =
      auth.currentUser.uid > id
        ? auth.currentUser.uid + id
        : id + auth.currentUser.uid;
    // eslint-disable-next-line
    const unSub = onSnapshot(doc(db, 'chatRooms', chat), (doc) => {
      doc.exists() && console.log(doc.data());
      setMessages(doc.data().messages.reverse());
      setChatId(doc.data().chat);
    });
    return () => {
      unSub();
    };
  };

  const sendMessage = async () => {
    await updateDoc(doc(db, 'chatRooms', chatId), {
      messages: arrayUnion({
        type: 'text',
        message: newMessage,
        senderId: auth.currentUser.uid,
        date: Timestamp.now().toDate().toString(),
      }),
      lastRefresh: Timestamp.now(),
    });
    setNewMessage(null);
  };

  const goCamera = () => {
    takePhoto().then(res => {
      if (res !== undefined) {
        setFilePath(res);
        setImageModalVisible(true);
      }
      setAttachModalVisible(false);
    });
  };

  const ımageSubmit = async () => {
    uploadImage({uri: filePath}).then(async res => {
      await updateDoc(doc(db, 'chatRooms', chatId), {
        messages: arrayUnion({
          type: 'image',
          message: res,
          senderId: auth.currentUser.uid,
          date: Timestamp.now().toDate().toString(),
        }),
        lastRefresh: Timestamp.now(),
      });
    });
  };

  const sendLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    const res = await Location.getCurrentPositionAsync({});
    const location = {
      longitude: res.coords.longitude,
      latitude: res.coords.latitude,
    };
    console.log('location', location);
    await updateDoc(doc(db, 'chatRooms', chatId), {
      messages: arrayUnion({
        type: 'location',
        message: location,
        senderId: auth.currentUser.uid,
        date: Timestamp.now().toDate().toString(),
      }),
      lastRefresh: Timestamp.now(),
    });
    setAttachModalVisible(false);
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.enabledDirection}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={attachModalVisible}
          onRequestClose={() => {
            setAttachModalVisible(!attachModalVisible);
          }}>
          <View style={styles.attachCenteredView}>
            <View style={styles.attachModalView}>
              <Attachment
                galleryTask={selectGallery}
                mapTask={sendLocation}
                cameraTask={goCamera}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={imageModalVisible}
          onRequestClose={() => {
            setImageModalVisible(!imageModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {filePath && (
                <Image style={styles.image} source={{uri: filePath}} />
              )}
              <Buttons
                task={() => {
                  ımageSubmit();
                  setImageModalVisible(false);
                  setFilePath(null);
                }}
                name="Send"
              />
              <Buttons
                task={() => {
                  setImageModalVisible(false);
                  setFilePath(null);
                }}
                name="Discard"
              />
            </View>
          </View>
        </Modal>
        <ImageBackground
          source={
            theme === 'Light'
              ? require('../../Assets/whiteBackGround.jpg')
              : require('../../Assets/blackBackground.jpg')
          }
          // Imagebackground view is choosed for messaging area.
          resizeMode="cover"
          style={styles.backGroundImage}>
          <FlatList
            inverted
            data={messages}
            renderItem={({item}) => (
              <MessageUnit
                message={item.message}
                sender={item.senderId}
                messageType={item.type}
                time={item.date}
              />
            )}
          />
          <ChatPageFooter
            messageText={newMessage}
            textInputTask={setNewMessage}
            sendIconTask={sendMessage}
            attachIconTask={() => {
              setAttachModalVisible(!attachModalVisible);
            }}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
