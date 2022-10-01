import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  enabledDirection: {
    width: '100%',
    flex: 1,
    position: 'relative',
    right: 15,
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginVertical: 10,
    alignItems: 'center',
  },
  secondIcon: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 6,
  },
  textDark: {
    color: 'white',
  },
  textLight: {
    color: '#212121',
  },
  textView: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  textImage: {
    flexDirection: 'row',
    marginRight: 'auto',
    alignItems: 'center',
  },
});
