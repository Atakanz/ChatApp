import React from 'react';
import {View, Text} from 'react-native';
import styles from './MessageUnit.style';
import {auth} from '../../../config';
import {useSelector} from 'react-redux';
const MessageUnit = props => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <View
      style={[
        props.sender === auth.currentUser.uid
          ? styles.senderUnit
          : styles.receiverUnit,
        styles[`messageUnitView${theme}`],
        styles.messageUnitView,
      ]}>
      <Text style={styles.textMessage}>{props.message}</Text>
    </View>
  );
};
export default MessageUnit;
