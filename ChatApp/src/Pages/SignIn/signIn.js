import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import LoginForm from '../../Components/LoginForm';
import styles from './signIn.styles';

const SignIn = ({navigation}) => {
  const theme = useSelector(state => state.theme.theme);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  // const loginUserButton = () => {
  //   navigation.navigate('SignUp');
  // };
  const signUpButton = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <LoginForm
        logo={require('../../Assets/logoInTouch.png')}
        brandName={require('../../Assets/brandName.png')}
        holder1="E-mail"
        holder2="Password"
        name1="Sign In"
        name2="Sign Up"
        value1={userEmail}
        value2={userPassword}
        emailFormTask={value => setUserEmail(value)}
        passwordFormTask={value => setUserPassword(value)}
        task1={signUpButton}
        task2={signUpButton}
        securityFalse={false}
        securityTrue={true}
        slogan="Keep in touch with friends."
      />
    </SafeAreaView>
  );
};

export default SignIn;
