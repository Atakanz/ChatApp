import React from 'react';
import {SafeAreaView, View, TextInput} from 'react-native';
import styles from './ChatPageFooter.style';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatPageFooter = props => {
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const send = (
    <Icon.Button
      name="send"
      size={30}
      onPress={props.sendIconTask}
      style={[styles.ıconButton, styles[`ıconButton${theme}`]]}
      color={colorSelect}
    />
  );
  const paperClip = (
    <Icon.Button
      name="paperclip"
      size={25}
      color={colorSelect}
      onPress={props.attachIconTask}
      style={[styles.ıconButton, styles[`ıconButton${theme}`]]}
    />
  );
  const smile = (
    <Icon name="emoticon-excited-outline" size={25} color={colorSelect} />
  );
  return (
    <SafeAreaView style={[styles.bottomBar, styles[`bottomBar${theme}`]]}>
      <View>{smile}</View>
      <TextInput
        style={[styles.textInput, styles[`textInput${theme}`]]}
        label="Mesaj"
        value={props.messageText}
        placeholder="Mesaj"
        placeholderTextColor={theme === 'Dark' ? '#fff' : '#212121'}
        onChangeText={props.textInputTask}
      />
      <View>{paperClip}</View>
      <View>{send}</View>
    </SafeAreaView>
  );
};

export default ChatPageFooter;
