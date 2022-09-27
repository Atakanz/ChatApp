import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styles from './messagesList.style';

function MessagesList() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello MessagesList!</Text>
    </SafeAreaView>
  );
}

export default MessagesList;
