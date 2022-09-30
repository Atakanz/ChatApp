import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import styles from './contacts.style';
import {db, auth} from '../../../config';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import UserCards from '../../Components/UserCards';

const ContactsList = ({navigation}) => {
  const [allUsers, setAllUsers] = useState([]);

  const getData = async () => {
    const q = query(
      collection(db, 'users'),
      where('id', '!=', auth.currentUser.uid),
    );
    await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      console.log('user', _users);
      setAllUsers(_users);
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  console.log('link', allUsers[0].photoUrl);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allUsers}
        renderItem={({item}) => (
          <UserCards
            name={item.name}
            surname={item.surname}
            link={item.photoUrl}
            task={() => navigation.navigate('ChatPage')}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ContactsList;
