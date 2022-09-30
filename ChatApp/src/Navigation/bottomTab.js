import React from 'react';
import {StyleSheet, Pressable, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {StatusBar} from 'expo-status-bar';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ContactsList from '../Pages/ContactsList';
import MessagesList from '../Pages/MessagesList';
import Status from '../Pages/StatusPage';

const Tab = createBottomTabNavigator();

export const BottomTab = ({navigation}) => {
  const theme = useSelector(state => state.theme.theme);
  const colorSelect = theme === 'Dark' ? '#fff' : '#212121';
  const editProfile = (
    <Icon
      name="pencil-outline"
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
        headerBackground: () => (
          <View style={[styles.logoView, styles[`logoView${theme}`]]}>
            <StatusBar style={theme === 'Dark' ? 'light' : 'dark'} />
            <Image
              style={styles.logo}
              source={require('../Assets/brandName.png')}
            />
          </View>
        ),
      }}>
      <Tab.Screen
        name="Contacts"
        component={ContactsList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-group" color={colorSelect} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
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
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              {editProfile}
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    bottom: 1,
    width: 125,
    height: 45,
  },
  logoView: {
    height: '100%',
    width: '100%',
  },
  logoViewDark: {
    backgroundColor: '#212121',
  },
  logoViewLight: {
    backgroundColor: '#fff',
  },
  rightIcon: {
    marginRight: 15,
  },
});
