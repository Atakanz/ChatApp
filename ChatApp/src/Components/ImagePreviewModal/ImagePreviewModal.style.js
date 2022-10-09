import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 100,
  },
  modalView: {
    margin: 20,
    paddingBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
