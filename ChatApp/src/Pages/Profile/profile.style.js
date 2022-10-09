import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 80,
    margin: 9,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 15,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#1A5BAA',
  },
  profileCardView: {
    justifyContent: 'center',
    backgroundColor: '#00B050',
    marginLeft: 5,
    padding: 10,
  },
  profileCardName: {
    fontSize: 15,
  },
  profileCardUsername: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  profileCardEmail: {
    fontSize: 15,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00B050',
    borderRadius: 30,
    marginBottom: 15,
  },
  friendsText: {
    alignItems: 'center',
  },
  friendsView: {
    marginTop: 20,
  },
  rightIcon: {
    marginRight: 20,
  },
  editPhotoView: {
    position: 'absolute',
    height: 35,
    width: 35,
    borderRadius: 50,
    top: 85,
    left: 78,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutView: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#212121',
  },
});
