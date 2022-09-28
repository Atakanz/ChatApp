import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './messagesList.style';

const MessagesList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello MessagesList!</Text>
    </SafeAreaView>
  );
};

export default MessagesList;
