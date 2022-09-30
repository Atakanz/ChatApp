import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image, Modal} from 'react-native';
import styles from './settings.style';
import {db, auth} from '../../../config';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import usePickImage from '../../Hooks/pickImageFromGallery';
import useUploadImage from '../../Hooks/xmlhttpRequest';
import Buttons from '../../Components/Buttons';
import {setUser, logOut} from '../../Management/Features/userSlice';
import {useDispatch, useSelector} from 'react-redux';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState('');
  const {pickImage} = usePickImage();
  const {uploadImage} = useUploadImage();

  const selectGallery = () => {
    pickImage().then(res => {
      if (res !== undefined) {
        setFilePath(res);
        setModalVisible(true);
      }
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    uploadImage({uri: filePath}).then(res => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      updateDoc(docRef, {photoUrl: res});
      dispatch(setUser({...userInfo, photoUrl: res}));
      console.log('updated', userInfo);
    });
  };

  const getData = async () => {
    const q = query(
      collection(db, 'users'),
      where('id', '==', auth.currentUser.uid),
    );
    await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      console.log('user', _users);
      dispatch(setUser(_users[0]));
    });
  };

  const logOutButton = () => {
    auth.signOut().then(() => {
      dispatch(logOut(null));
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const userInfo = useSelector(state => state.auth.user);
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {filePath && (
              <Image style={styles.image} source={{uri: filePath}} />
            )}
            <Buttons
              task={() => {
                handleSubmit();
                setModalVisible(false);
                setFilePath(null);
              }}
              name="Save"
            />
            <Buttons
              task={() => {
                setModalVisible(false);
                setFilePath(null);
              }}
              name="Discard"
            />
          </View>
        </View>
      </Modal>
      <Buttons name="Edit photo" task={selectGallery} />
      <Buttons name="Log out" task={logOutButton} />
      {userInfo.photoUrl && (
        <Image style={styles.photo} source={{uri: userInfo.photoUrl}} />
      )}
    </SafeAreaView>
  );
};

export default Settings;
