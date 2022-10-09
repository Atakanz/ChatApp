import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 20,
  },
  profileNameView: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
  },
});
