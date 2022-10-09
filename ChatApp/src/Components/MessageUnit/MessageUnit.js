import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './MessageUnit.style';
import {auth} from '../../../config';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
const MessageUnit = props => {
  const navigation = useNavigation();
  let text = null;
  let image = null;
  let location = null;
  if (props.messageType === 'text') {
    text = true;
  }
  if (props.messageType === 'image') {
    image = true;
  }
  if (props.messageType === 'location') {
    location = true;
  }
  const hourInfo = props.time.slice(16, 21);
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
      {text && (
        <View>
          <Text style={styles.textMessage}>{props.message}</Text>
        </View>
      )}
      {image && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Image', {photo: props.message});
          }}>
          <View>
            <Image source={{uri: props.message}} style={styles.imageMessage} />
          </View>
        </TouchableOpacity>
      )}
      {location && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Map', {
              latitude: props.message.latitude,
              longitude: props.message.longitude,
              sender: props.sender,
            });
          }}>
          <MapView
            region={{
              latitude: props.message.latitude,
              longitude: props.message.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
            maxZoomLevel={15}>
            <Marker
              coordinate={{
                latitude: props.message.latitude,
                longitude: props.message.longitude,
              }}
              pinColor={
                props.sender === auth.currentUser.uid ? '#00B050' : '#1A5BAA'
              }
            />
          </MapView>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.date}>{hourInfo}</Text>
      </View>
    </View>
  );
};
export default MessageUnit;
