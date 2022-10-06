import React from 'react';
import {SafeAreaView, Pressable} from 'react-native';
import styles from './Attachment.style';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const Attachment = props => {
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const image = (
    <Icon
      name="image"
      onPress={props.galleryTask}
      size={30}
      color={colorSelect}
    />
  );
  const map = <Icon name="map-marker" size={30} color={colorSelect} />;
  const camera = <Icon name="camera" size={30} color={colorSelect} />;
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={props.galleryTask}>{image}</Pressable>
      <Pressable style={styles.middleButton} onPress={props.cameraTask}>
        {camera}
      </Pressable>
      <Pressable onPress={props.mapTask}>{map}</Pressable>
    </SafeAreaView>
  );
};

export default Attachment;
