import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Profile() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: signOut },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 justify-center">
        
        <View className="bg-white rounded-xl  mb-6">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
              <Text className="text-black text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-bold">{user?.name || 'Usuário'}</Text>
              <Text className="text-gray-400">{user?.email || 'email@exemplo.com'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-red-600 py-4 rounded-xl flex-row items-center justify-center gap-2"
          onPress={handleLogout}
        >
          <AntDesign name="logout" size={20} color="white" />
          <Text className="text-white font-bold">Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

