import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Home from '../screens/home';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#282828',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#bdb51b',
          tabBarInactiveTintColor: '#696969',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

