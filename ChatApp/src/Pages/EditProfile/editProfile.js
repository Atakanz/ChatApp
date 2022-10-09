import React, {useState, useEffect} from 'react';
import {SafeAreaView, Pressable, Text, Button, Alert} from 'react-native';
import styles from './editProfile.style';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../Management/Features/userSlice';
import LoginForm from '../../Components/LoginForm/LoginForm';
import {doc, updateDoc} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {db, auth} from '../../../config';
import {setTheme} from '../../Management/Features/themeSlice';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {updateEmail, updatePassword} from 'firebase/auth';

const EditProfile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const user = useSelector(state => state.auth.user);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const toggleThemeIcon = (
    <Icon
      name="theme-light-dark"
      size={30}
      color={colorSelect}
      style={styles.rightIcon}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={toggleTheme}>{toggleThemeIcon}</Pressable>
      ),
    });
  });

  const toggleTheme = () => {
    if (theme === 'Light') {
      dispatch(setTheme('Dark'));
    } else {
      dispatch(setTheme('Light'));
    }
  };

  const editProfile = async () => {
    await updateEmail(auth.currentUser, userEmail)
      .then(() => {})
      .catch(error => {
        console.log('email', error);
      });
    await updatePassword(auth.currentUser, userPassword)
      .then(() => {})
      .catch(error => {
        console.log('password', error);
      });
    const docRef = doc(db, 'users', user.id);
    await updateDoc(docRef, {email: userEmail, username: userName});
    dispatch(logOut(null));
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <LoginForm
        brandName={require('../../Assets/brandName.png')}
        holder1="E-mail"
        holder2="Password"
        holder5="User name"
        name1="Save"
        value1={userEmail}
        value2={userPassword}
        value5={userName}
        emailFormTask={setUserEmail}
        passwordFormTask={setUserPassword}
        userSurnameFormTask={setUserName}
        task1={editProfile}
        securityFalse={false}
        securityTrue={true}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
