import React from 'react';
import {View, Text} from 'react-native';
import styles from './MessageUnit.style';
const MessageUnit = props => {
  return (
    <View style={styles.messageUnitView}>
      <Text style={styles.textMessage}>{props.message}</Text>
    </View>
  );
};
export default MessageUnit;
