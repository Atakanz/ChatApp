import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomTab} from './bottomTab';
// import { setUser } from '../Management/Features/User/userSlice';
// import { auth } from '../../config';
import LoginStack from './loginStack';
import CameraScreen from '../Pages/CameraScreen';
import settingStack from './settingsStack';
import Map from '../Pages/Map';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user.user);
  //   const getSavedItem = async () => {
  //     const userData = await AsyncStorage.getItem('savedUser');
  //     console.log('loginUser', userData);
  //     const _user = userData ? JSON.parse(userData) : null;
  //     dispatch(setUser(_user));
  //     // console.log(_user);
  //     if (_user !== null) {
  //       signInWithEmailAndPassword(auth, _user.mail, _user.password);
  //     }
  //   };

  //   useEffect(() => {
  //     getSavedItem();
  //   }, [dispatch]);
  //   console.log('mains', user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginStack} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Settings" component={settingStack} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
