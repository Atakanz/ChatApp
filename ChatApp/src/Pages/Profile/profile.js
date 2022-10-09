import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import styles from './profile.style';
import {db, auth} from '../../../config';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import usePickImage from '../../Hooks/pickImageFromGallery';
import useUploadImage from '../../Hooks/xmlhttpRequest';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ImagePreviewModal from '../../Components/ImagePreviewModal/ImagePreviewModal';
import UserCards from '../../Components/UserCards';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {logOut} from '../../Management/Features/userSlice';
import SectionHeader from '../../Components/SectionHeader';
import {onAuthStateChanged} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [userId, setUserId] = useState();
  const {pickImage} = usePickImage();
  const {uploadImage} = useUploadImage();
  const user = useSelector(state => state.auth.user);
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';

  const accountEdit = (
    <Icon
      name="account-edit"
      size={30}
      color={colorSelect}
      style={styles.rightIcon}
    />
  );
  const logOutIcon = <Icon name="logout" size={30} color={colorSelect} />;
  const editProfilePhoto = <Icon name="pencil" size={30} color={'#00B050'} />;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('Edit');
          }}>
          {accountEdit}
        </Pressable>
      ),
    });
  });

  const selectGallery = () => {
    pickImage().then(res => {
      if (res !== undefined) {
        setFilePath(res);
        setModalVisible(true);
      }
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  let friendsInfo = [];
  const getFriends = async () => {
    console.log('before', user);
    const friendsIds = user.friends;
    friendsIds.forEach(async function (item) {
      const docRef = doc(db, 'users', item.friendId);
      const docSnap = await getDoc(docRef);
      const receiver = docSnap.data();
      const info = {
        name: receiver.name,
        photoUrl: receiver.photoUrl,
        id: receiver.id,
      };
      friendsInfo.push(info);
      if (friendsIds.length === friendsInfo.length) {
        setFriendsList(friendsInfo);
      }
    });
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, [user, isFocused, userId]);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    uploadImage({uri: filePath}).then(res => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      updateDoc(docRef, {photoUrl: res});
    });
  };

  const logOutButton = () => {
    auth.signOut().then(() => {
      dispatch(logOut(null));
    });
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      {modalVisible && (
        <ImagePreviewModal
          state={modalVisible}
          setFalseVisibility={() => {
            setModalVisible(false);
          }}
          file={filePath}
          sendFunction={() => {
            handleSubmit();
          }}
          setNullFile={() => {
            setFilePath(null);
          }}
        />
      )}

      <View style={styles.rowDirection}>
        <View>
          <View>
            <Image style={styles.photo} source={{uri: user.photoUrl}} />
          </View>
          <View style={styles.editPhotoView}>
            <Pressable onPress={selectGallery}>{editProfilePhoto}</Pressable>
          </View>
        </View>
        <View style={styles.profileCardView}>
          <Text style={styles.profileCardUsername}>{user.username}</Text>
          <Text style={styles.profileCardEmail}>{user.email}</Text>
        </View>
        <Pressable style={styles.logOutView} onPress={logOutButton}>
          <View>{logOutIcon}</View>
        </Pressable>
      </View>

      <SectionHeader header="Friends" />
      <FlatList
        data={friendsList}
        renderItem={({item}) => (
          <UserCards
            name={item.name}
            photoUrl={item.photoUrl}
            task={() => {
              navigation.navigate('ChatPage', {
                name: item.name,
                photoUrl: item.photoUrl,
                id: item.id,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
