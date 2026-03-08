import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Profile() {
  const { user, signOut } = useAuth();


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 justify-center">
        
        <View className="bg-white rounded-xl  mb-6">
          <View className=" items-center gap-4">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
              <Text className="text-black text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="">
              <Text className="text-black text-lg text-center font-bold">{user?.name || 'Usuário'}</Text>
              <Text className="text-gray-400">{user?.email || 'email@exemplo.com'}</Text>
            </View>
          </View>

          
        </View>

      
      </View>
    </SafeAreaView>
  );
}

