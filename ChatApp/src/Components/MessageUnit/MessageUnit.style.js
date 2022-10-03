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
    fontSize: 19,
    color: '#212121',
  },
});
