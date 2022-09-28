import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  enabledDirection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center',
  },
  logoView: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 80,
  },
  brandName: {
    marginTop: 10,
    width: 188,
    height: 50,
  },
  buttonColumn: {
    flexDirection: 'column',
    marginTop: 30,
  },
  isAccountText: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  isAccountTextDark: {
    color: '#fff',
  },
  sloganText: {
    fontWeight: 'bold',
    marginTop: 40,
  },
  sloganTextDark: {
    color: '#fff',
  },
});
