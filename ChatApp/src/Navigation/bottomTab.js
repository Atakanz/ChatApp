import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ContactsList from '../Pages/ContactsList';
import MessagesList from '../Pages/MessagesList';
import { SettingStack } from './statusSettingsStack';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const theme = useSelector((state) => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const firstIcon = <Icon name="account-group" color={colorSelect} size={25} />;

  const secondIcon = <Icon name="comment-text-multiple" color={colorSelect} size={25} />;

  const thirdIcon = <Icon name="progress-upload" color={colorSelect} size={25} />;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
        tabBarActiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsList}
        options={{
          tabBarIcon: { firstIcon },
        }}
      />
      <Tab.Screen
        name="MessageList"
        component={MessagesList}
        options={{
          tabBarIcon: { secondIcon },
        }}
      />
      <Tab.Screen
        name="Status"
        component={SettingStack}
        options={{
          tabBarIcon: { thirdIcon },
        }}
      />
    </Tab.Navigator>
  );
}
