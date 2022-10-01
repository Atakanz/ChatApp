import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  FlatList,
  View,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import ChatPageHeader from '../../Components/ChatPageHeader/ChatPageHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageUnit from '../../Components/MessageUnit/MessageUnit';
import styles from './chatPage.style';
import {useSelector} from 'react-redux';
import {collection, query} from 'firebase/firestore';

const ChatPage = ({navigation, route}) => {
  const theme = useSelector(state => state.theme.theme);
  const [newMessage, setNewMessage] = useState(' ');
  const {item} = route.params;
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const phone = <Icon name="phone" size={25} color={colorSelect} />;
  const dots = <Icon name="dots-vertical" size={25} color={colorSelect} />;
  const goBack = (
    <Icon.Button
      name="keyboard-backspace"
      size={30}
      onPress={() => navigation.goBack()}
      style={[styles.ıconButton, styles[`backButton${theme}`]]}
      color={colorSelect}
    />
    // goBack() navigation property is added to goBack ıcon.
  );
  const smile = (
    <Icon name="emoticon-excited-outline" size={25} color={colorSelect} />
  );
  const paperClip = <Icon name="paperclip" size={25} color={colorSelect} />;
  // setIndexOfContact(ContactList.indexOf(item));

  const getMessages = () => {
    const q = query(collection(db, 'chatRooms'), where('members', '=='));
  };

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
          {/* <FlatList
            data={item}
            renderItem={({item}) => <MessageUnit message={item.text} />}
          /> */}
          <View style={[styles.bottomBar, styles[`bottomBar${theme}`]]}>
            <View>{smile}</View>
            <TextInput
              style={styles.textInput}
              label="Mesaj"
              placeholder="Mesaj"
              onChangeText={setNewMessage}
            />
            <View>{paperClip}</View>
            {/* <View>{send}</View> */}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
