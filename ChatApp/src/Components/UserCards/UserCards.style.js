import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 12,
    maxHeight: 99,
  },
  enabledDirection: {
    flexDirection: 'row',
  },
  containerDark: {
    backgroundColor: '#212121',
  },
  containerLight: {
    backgroundColor: 'white',
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 70,
  },
  viewImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
  },
  textInfo: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#fff',
  },
  textLight: {
    color: '#212121',
  },
  textView: {
    justifyContent: 'center',
    maxWidth: 230,
  },
  lastMessage: {
    position: 'relative',
    right: 3,
    marginTop: 5,
  },
  hourInfo: {
    marginLeft: 'auto',
    justifyContent: 'center',
    marginRight: 7,
  },
  lastMessageType: {
    fontStyle: 'italic',
    marginTop: 3,
  },
});
