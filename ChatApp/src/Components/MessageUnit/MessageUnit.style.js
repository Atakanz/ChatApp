import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  messageUnitView: {
    borderRadius: 10,
    marginVertical: 5,
    width: 'auto',
    marginHorizontal: 5,
    alignSelf: 'flex-start',
    padding: 6,
    flexDirection: 'row',
    marginRight: 10,
    // MessageUnit width is set to changeable with the width of text
  },
  senderUnit: {
    marginLeft: 'auto',
    backgroundColor: '#00B853',
  },
  receiverUnit: {
    marginRight: 'auto',
    backgroundColor: '#00B0F0',
  },
  textMessage: {
    fontSize: 15,
    color: '#212121',
    maxWidth: 200,
  },
  date: {
    fontSize: 10,
    color: '#212121',
    position: 'relative',
    marginTop: 'auto',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  imageMessage: {
    width: 200,
    height: 200,
  },
  map: {
    width: 200,
    height: 200,
  },
});
