import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default StyleSheet.create({
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
    backgroundColor: 'black',
  },
  bottomBarLight: {
    backgroundColor: '#fff',
  },
  textInput: {
    width: '75%',
    color: '#212121',
  },
  textInputDark: {
    width: '75%',
    color: '#fff',
  },
  ıconButton: {
    flex: 0,
    width: 35,
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
});
