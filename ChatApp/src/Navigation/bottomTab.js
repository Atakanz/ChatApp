import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import DefaultHeader from '../Components/DefaultHeader/DefaultHeader';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MessagesList from '../Pages/MessagesList';
import Status from '../Pages/StatusPage';
import Profile from '../Pages/Profile/profile';

const Tab = createBottomTabNavigator();

export const BottomTab = ({navigation}) => {
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const searchUser = (
    <Icon
      name="account-search-outline"
      size={30}
      color={colorSelect}
      style={styles.rightIcon}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
        tabBarActiveBackgroundColor: theme === 'Dark' ? '#212121' : '#fff',
        tabBarShowLabel: false,
        headerTitle: '',
        tabBarStyle: {
          height: 50,
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: theme === 'Dark' ? '#212121' : '#20b2aa',
        },
        headerBackground: () => <DefaultHeader />,
      }}>
      <Tab.Screen
        name="Messages"
        component={MessagesList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="comment-text-multiple" color={colorSelect} size={30} />
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Contacts')}>
              {searchUser}
            </Pressable>
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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={colorSelect} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  rightIcon: {
    marginRight: 20,
  },
});
