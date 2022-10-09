import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  rightIcon: {
    marginRight: 20,
  },
  galleryModalView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusIcon: {
    flex: 1,
    position: 'absolute',
    left: 70,
    top: 80,
    backgroundColor: 'white',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#212121',
  },
});
