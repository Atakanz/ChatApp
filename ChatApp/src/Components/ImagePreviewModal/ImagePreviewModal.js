import React from 'react';
import {View, Modal, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Buttons from '../Buttons';
import styles from './ImagePreviewModal.style';

const ImagePreviewModal = props => {
  console.log('inner', props.file);
  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.state}
        onRequestClose={props.setFalseVisibility}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {props.file && (
              <Image style={styles.image} source={{uri: props.file}} />
            )}
            <Buttons
              task={() => {
                props.sendFunction();
                props.setFalseVisibility();
                props.setNullFile();
              }}
              name="Send"
            />
            <Buttons task={props.setFalseVisibility} name="Discard" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ImagePreviewModal;
