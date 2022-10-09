import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native';
import styles from './map.style';
import {auth} from '../../../config';

const Map = ({navigation, route}) => {
  const {longitude, latitude, sender} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        maxZoomLevel={15}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          pinColor={sender === auth.currentUser.uid ? '#00B050' : '#1A5BAA'}
        />
      </MapView>
    </SafeAreaView>
  );
};

export default Map;
