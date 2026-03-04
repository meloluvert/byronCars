import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl">Perfil</Text>
      </View>
    </SafeAreaView>
  );
}

