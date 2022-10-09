import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 10,
  },
  status: {
    height: 300,
    position: 'relative',
    bottom: 40,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
});
