import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
import Home from '../screens/home';
import { Alert } from 'react-native';
import Profile from '../screens/profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'contexts/AuthContext';
import LogoutScreen from 'screens/logout';
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
            headerShown: true,
            headerTitle: 'Perfil',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Logout"
          component={LogoutScreen

          }
          options={{
            headerShown: false,
            headerTitle: 'Perfil',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <MaterialIcons name="logout" size={24} color={'#f70000'} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

