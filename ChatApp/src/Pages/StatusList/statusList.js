import React from 'react';
import {SafeAreaView, FlatList, Image, View, Text} from 'react-native';
import styles from './statusList.style';
import StoryUnit from '../../Components/StoryUnit/StoryUnit';
import {StatusBar} from 'expo-status-bar';
import {Timestamp} from 'firebase/firestore';

const StatusList = ({navigation, route}) => {
  const {statusType1, statusType2, user, item} = route.params;
  let statusesInfo = null;
  let statusesList = null;

  if (statusType1) {
    statusesInfo = user;
    statusesList = user.statuses;
  } else if (statusType2) {
    statusesInfo = item;
    statusesList = item.allStatuses;
  }
  let now = Timestamp.now().toDate().toString();
  const theNewestOnes = statusesList.filter(
    elem =>
      elem.date.slice(4, 11) === now.slice(4, 11) ||
      (parseInt(elem.date.slice(16, 18)) > parseInt(now.slice(16, 18)) - 1 &&
        elem.date.slice(4, 11) !== now.slice(4, 11)),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.profileInfoView}>
        {statusesInfo.photoUrl ? (
          <Image
            source={{uri: statusesInfo.photoUrl}}
            style={styles.profilePhoto}
          />
        ) : (
          <Image
            source={require('../../Assets/noProfilePhoto.jpg')}
            style={styles.profilePhoto}
          />
        )}
        <View style={styles.profileNameView}>
          <Text style={styles.profileName}>{statusesInfo.name}</Text>
        </View>
      </View>
      <FlatList
        horizontal
        data={theNewestOnes}
        renderItem={({item}) => (
          <StoryUnit status={item.status} date={item.date} />
        )}
      />
    </SafeAreaView>
  );
};

export default StatusList;
