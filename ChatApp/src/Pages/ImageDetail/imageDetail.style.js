import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
  },
  image: {
    height: 300,
    position: 'relative',
    bottom: 40,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
});
