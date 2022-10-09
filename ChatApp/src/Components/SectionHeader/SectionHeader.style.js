import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerView: {
    width: Dimensions.get('window').width,
    height: 20,
    backgroundColor: '#1A5BAA',
    opacity: 0.6,
  },
  header: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerDark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
