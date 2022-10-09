import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import styles from './imageDetail.style';

const ImageDetail = ({route}) => {
  const {photo} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: photo}} style={styles.image} />
    </SafeAreaView>
  );
};

export default ImageDetail;
