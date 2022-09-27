import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styles from './cameraScreen.style';

function CameraScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello CameraScreen!</Text>
    </SafeAreaView>
  );
}

export default CameraScreen;
