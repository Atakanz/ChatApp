import React from 'react';
import {SafeAreaView, Pressable, Modal, View} from 'react-native';
import styles from './Attachment.style';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Attachment = props => {
  const image = (
    <Icon name="image" onPress={props.galleryTask} size={30} color="black" />
  );
  const map = <Icon name="map-marker" size={30} color="black" />;
  const camera = <Icon name="camera" size={30} color="black" />;
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.state}
        onRequestClose={() => {
          props.setVisibleFalse();
        }}>
        <View style={styles.attachCenteredView}>
          <View style={styles.attachModalView}>
            <Pressable onPress={props.galleryTask}>{image}</Pressable>
            <Pressable style={styles.middleButton} onPress={props.cameraTask}>
              {camera}
            </Pressable>
            <Pressable onPress={props.mapTask}>{map}</Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Attachment;
