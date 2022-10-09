import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, Pressable} from 'react-native';
import ImagePreviewModal from '../../Components/ImagePreviewModal/ImagePreviewModal';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import styles from './statusPages.style';
import usePickImage from '../../Hooks/pickImageFromGallery';
import useUploadImage from '../../Hooks/xmlhttpRequest';
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import UserCards from '../../Components/UserCards';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {onAuthStateChanged} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {db, auth} from '../../../config';
import {useIsFocused} from '@react-navigation/native';

const StatusPages = () => {
  const [filePath, setFilePath] = useState();
  const user = useSelector(state => state.auth.user);
  const [userId, setUserId] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [statusesList, setStatusesList] = useState([]);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const {pickImage} = usePickImage();
  const {uploadImage} = useUploadImage();

  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const addStatus = (
    <Icon
      name="plus-box-outline"
      size={30}
      color={colorSelect}
      style={styles.rightIcon}
    />
  );
  const addStatusOverCard = (
    <Icon name="plus-thick" size={30} color="#00B050" />
  );
  const sharedStatus = <Icon name="progress-check" size={30} color="#00B050" />;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={selectGallery}>{addStatus}</Pressable>
      ),
    });
  });

  const selectGallery = () => {
    pickImage().then(res => {
      if (res !== undefined) {
        setFilePath(res);
        setImageModalVisible(true);
      }
    });
  };

  const ımageSubmit = async () => {
    uploadImage({uri: filePath}).then(async res => {
      await updateDoc(doc(db, 'users', user.id), {
        statuses: arrayUnion({
          status: res,
          senderId: user.id,
          date: Timestamp.now().toDate().toString(),
        }),
        lastStatusRefresh: Timestamp.now(),
      });
      setActiveStatus(true);
    });
  };
  let now = Timestamp.now().toDate().toString();
  const fetchStatuses = async () => {
    // eslint-disable-next-line
    const friendsList = user.friends;
    if (friendsList) {
      let result = [];
      friendsList.forEach(async function (item) {
        const docRef = doc(db, 'users', item.friendId);
        const docSnap = await getDoc(docRef);
        const receiver = docSnap.data();
        if (receiver.statuses !== undefined) {
          const statusesArray = receiver.statuses;
          const lastStatus = statusesArray[statusesArray.length - 1];
          if (
            lastStatus.date.slice(4, 11) === now.slice(4, 11) ||
            (parseInt(lastStatus.date.slice(4, 11)) !== now.slice(4, 11) &&
              parseInt(lastStatus.date.slice(16, 18)) >
                parseInt(now.slice(16, 18)) - 1)
          ) {
            const receiverInfo = {
              name: receiver.username,
              id: receiver.id,
              photoUrl: receiver.photoUrl,
              allStatuses: receiver.statuses,
            };
            result.push(receiverInfo);
          }
          setStatusesList(result);
        }
      });
    }
  };
  const isFocused = useIsFocused();
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

  const isHaveActiveStatuses = () => {
    if (user.statuses) {
      const userStatuses = user.statuses;
      const lastStatus = userStatuses[userStatuses.length - 1];
      if (
        lastStatus.date.slice(4, 11) === now.slice(4, 11) ||
        (parseInt(lastStatus.date.slice(4, 11)) !== now.slice(4, 11) &&
          parseInt(lastStatus.date.slice(16, 18)) >
            parseInt(now.slice(16, 18)) - 1)
      ) {
        setActiveStatus(true);
      }
    } else {
      setActiveStatus(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
    isHaveActiveStatuses();
    // eslint-disable-next-line
  }, [userId, isFocused, user]);

  const statusType1 = 'Your statuses';
  const statusType2 = "Friend's statuses";
  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      {imageModalVisible && (
        <ImagePreviewModal
          state={imageModalVisible}
          setFalseVisibility={() => {
            setImageModalVisible(false);
          }}
          file={filePath}
          sendFunction={() => {
            ımageSubmit();
          }}
          setNullFile={() => {
            setFilePath(null);
          }}
        />
      )}

      <SectionHeader header={statusType1} />

      {activeStatus === true ? (
        <UserCards
          style={styles.yourStatuses}
          name={user.username}
          photoUrl={user.photoUrl}
          task={() => {
            navigation.navigate('StatusList', {statusType1, user});
          }}
        />
      ) : (
        <UserCards
          name={user.username}
          photoUrl={user.photoUrl}
          task={() => {
            selectGallery();
          }}
        />
      )}

      {!activeStatus && (
        <View style={styles.statusIcon}>{addStatusOverCard}</View>
      )}
      {activeStatus && <View style={styles.statusIcon}>{sharedStatus}</View>}

      <SectionHeader header={statusType2} />
      <FlatList
        data={statusesList}
        renderItem={({item}) => (
          <UserCards
            name={item.name}
            photoUrl={item.photoUrl}
            time={item.date}
            task={() => {
              navigation.navigate('StatusList', {statusType2, item});
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default StatusPages;
