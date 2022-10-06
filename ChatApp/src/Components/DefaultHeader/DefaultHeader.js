import React, {useEffect} from 'react';
import {Pressable, Image, View} from 'react-native';
import styles from './DefaultHeader.style';
import {StatusBar} from 'expo-status-bar';
import {useSelector} from 'react-redux';

const DefaultHeader = () => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <View style={[styles.logoView, styles[`logoView${theme}`]]}>
      <StatusBar style={theme === 'Dark' ? 'light' : 'dark'} />
      <Image
        style={styles.logo}
        source={require('../../Assets/brandName.png')}
      />
    </View>
  );
};

export default DefaultHeader;
