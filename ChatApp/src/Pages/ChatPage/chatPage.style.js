import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backGroundImage: {
    flex: 1,
    paddingTop: 5,
  },
  container: {
    flex: 1,
  },
  enabledDirection: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingLeft: 12,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#00B050',
    height: 50,
  },
  bottomBarDark: {
    backgroundColor: '#212121',
  },
  bottomBarLight: {
    backgroundColor: '#fff',
  },
  textInput: {
    width: '75%',
  },
  ıconButton: {
    flex: 0,
    width: 40,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 0,
    paddingTop: 0,
    color: 'white',
  },
  ıconButtonDark: {
    backgroundColor: '#212121',
  },
  ıconButtonLight: {
    backgroundColor: '#fff',
  },
  backButtonDark: {
    backgroundColor: '#212121',
  },
  backButtonLight: {
    backgroundColor: '#71a6e2',
  },
  attachCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 230,
    left: 140,
  },
  attachModalView: {
    justifyContent: 'center',
    padding: 6,
    height: 150,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1.8,
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
});
