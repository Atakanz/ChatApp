import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../Pages/Settings';
import EditProfile from '../Pages/EditProfile';

const Stack = createNativeStackNavigator();

export function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Settings} />
      <Stack.Screen name="Edit" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default SettingStack;
