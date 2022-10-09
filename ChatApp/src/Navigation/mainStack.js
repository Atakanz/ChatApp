import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomTab} from './bottomTab';
import {setUser} from '../Management/Features/userSlice';
import LoginStack from './loginStack';
import ContactsList from '../Pages/ContactsList';
import StatusList from '../Pages/StatusList';
import ChatPage from '../Pages/ChatPage';
import ImageDetail from '../Pages/ImageDetail';
import EditProfile from '../Pages/EditProfile/editProfile';
import ChatPageHeader from '../Components/ChatPageHeader/ChatPageHeader';
import Map from '../Pages/Map';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isUserExist = async () => {
    const userData = await AsyncStorage.getItem('savedUser');
    console.log('loginUser', userData);
    const _user = userData ? JSON.parse(userData) : null;
    dispatch(setUser(_user));
  };

  useEffect(() => {
    isUserExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {backgroundColor: '#00B0F0'},
              }}
              name="Contacts"
              component={ContactsList}
            />
            <Stack.Screen
              options={({route}) => ({
                headerShown: true,
                headerStyle: {backgroundColor: '#00B0F0'},
                headerTitle: () => (
                  <ChatPageHeader
                    name={route.params.name}
                    src={route.params.photoUrl}
                  />
                ),
              })}
              name="ChatPage"
              component={ChatPage}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {backgroundColor: '#00B0F0'},
              }}
              name="Edit"
              component={EditProfile}
            />
            <Stack.Screen name="StatusList" component={StatusList} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Image" component={ImageDetail} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
