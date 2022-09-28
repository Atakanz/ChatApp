import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import styles from './signUp.style';
import LoginForm from '../../Components/LoginForm';
import {useSelector} from 'react-redux';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import {auth, db} from '../../../config';

const SignUp = ({navigation}) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRePassword, setNewUserRePassword] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserSurname, setNewUserSurname] = useState('');
  const theme = useSelector(state => state.theme.theme);

  const registerUser = async () => {
    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword).then(
      async response => {
        await setDoc(doc(db, 'users', response.user.uid), {
          email: response.user.email,
          id: response.user.uid,
        });
      },
    );
  };

  const signUpButton = () => {
    if (newUserRePassword === newUserPassword) {
      registerUser();
      navigation.navigate('SignIn');
    } else {
      Alert.alert('InTouch', 'Passwords do not match.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <LoginForm
        logo={require('../../Assets/logoInTouch.png')}
        brandName={require('../../Assets/brandName.png')}
        holder1="E-mail"
        holder2="Password"
        holder3="Password again"
        holder4="Name"
        holder5="Surname"
        name1="Sign Up"
        value1={newUserEmail}
        value2={newUserPassword}
        value3={newUserRePassword}
        value4={newUserName}
        value5={newUserSurname}
        emailFormTask={setNewUserEmail}
        passwordFormTask={setNewUserPassword}
        repasswordFormTask={setNewUserRePassword}
        userNameFormTask={setNewUserName}
        userSurnameFormTask={setNewUserSurname}
        task1={signUpButton}
        securityFalse={false}
        securityTrue={true}
      />
    </SafeAreaView>
  );
};
export default SignUp;
