import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import styles from './signUp.style';
import LoginForm from '../../Components/LoginForm';
import {useSelector} from 'react-redux';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {auth, db} from '../../../config';

const SignUp = ({navigation}) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRePassword, setNewUserRePassword] = useState('');
  const [newName, setName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const theme = useSelector(state => state.theme.theme);

  const registerUser = async () => {
    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword).then(
      async response => {
        await setDoc(doc(db, 'users', response.user.uid), {
          email: response.user.email,
          id: response.user.uid,
          name: newUserName,
          username: newUserName,
          photoUrl: null,
        });
      },
    );
  };

  const signUpButton = async () => {
    const q = query(
      collection(db, 'users'),
      where('username', '==', newUserName),
    );
    await getDocs(q).then(res => {
      if (res.docs.length > 0) {
        Alert.alert(
          'DeepTalk',
          'User name exists, please specify another one.',
        );
        return;
      } else if (newUserRePassword !== newUserPassword) {
        Alert.alert('DeepTalk', 'Passwords do not match.');
        return;
      } else if (newUserRePassword === newUserPassword) {
        registerUser();
        navigation.navigate('SignIn');
      }
    });
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <LoginForm
        brandName={require('../../Assets/brandName.png')}
        holder1="E-mail"
        holder2="Password"
        holder3="Password again"
        holder4="Name"
        holder5="User name"
        name1="Sign Up"
        value1={newUserEmail}
        value2={newUserPassword}
        value3={newUserRePassword}
        value4={newName}
        value5={newUserName}
        emailFormTask={setNewUserEmail}
        passwordFormTask={setNewUserPassword}
        repasswordFormTask={setNewUserRePassword}
        userNameFormTask={setName}
        userSurnameFormTask={setNewUserName}
        task1={signUpButton}
        securityFalse={false}
        securityTrue={true}
      />
    </SafeAreaView>
  );
};
export default SignUp;
