import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ContactsList from '../Pages/ContactsList';
import MessagesList from '../Pages/MessagesList';
import Status from '../Pages/StatusPage';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
        tabBarActiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
      }}>
      <Tab.Screen
        name="ContactsList"
        component={ContactsList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-group" color={colorSelect} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="MessageList"
        component={MessagesList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="comment-text-multiple" color={colorSelect} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="progress-upload" color={colorSelect} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
