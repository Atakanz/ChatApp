import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  middleButton: {
    marginVertical: 20,
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
});
