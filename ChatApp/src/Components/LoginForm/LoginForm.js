import React from 'react';
import {SafeAreaView, View, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import TextInputs from '../TextInputs/TextInputs';
import Buttons from '../Buttons';
import styles from './LoginForm.style';

const LoginForm = props => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <SafeAreaView style={styles.enabledDirection}>
      <View>
        <View style={styles.logoView}>
          {props.brandName && (
            <Image style={styles.brandName} source={props.brandName} />
          )}
        </View>
        <View style={styles.nameInput}>
          <TextInputs
            labelName="E-mail"
            holder={props.holder1}
            value={props.value1}
            task={props.emailFormTask}
            security={props.securityFalse}
          />
          <TextInputs
            labelName="Password"
            value={props.value2}
            holder={props.holder2}
            task={props.passwordFormTask}
            security={props.securityTrue}
          />

          {props.holder3 && (
            <TextInputs
              labelName="PasswordAgain"
              value={props.value3}
              holder={props.holder3}
              task={props.repasswordFormTask}
              security={props.securityTrue}
            />
            // passwordagain is shown only signup page
          )}
          {props.holder4 && (
            <TextInputs
              labelName="User Name"
              value={props.value4}
              holder={props.holder4}
              task={props.userNameFormTask}
              security={props.securityFalse}
            />
          )}
          {props.holder5 && (
            <TextInputs
              labelName="User Name"
              value={props.value5}
              holder={props.holder5}
              task={props.userSurnameFormTask}
              security={props.securityFalse}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonColumn}>
        {props.name1 && <Buttons name={props.name1} task={props.task1} />}
        <View style={styles.centerText}>
          {props.name2 && (
            <Text
              style={[styles.isAccountText, styles[`isAccountText${theme}`]]}>
              Don't you have an account?
            </Text>
          )}
        </View>
        {props.name2 && <Buttons name={props.name2} task={props.task2} />}
        {/* signup page only has one button to navigate re-signın page. */}
        <View style={styles.centerText}>
          {props.slogan && (
            <Text style={[styles.sloganText, styles[`sloganText${theme}`]]}>
              {props.slogan}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
