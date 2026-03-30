import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ name, email });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao atualizar dados');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-4 py-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-xl mb-6">
            <View className="items-center gap-4">
              <View className="w-20 h-20 bg-primary rounded-full items-center justify-center">
                <Text className="text-black text-3xl font-bold">
                  {name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
            </View>
          </View>

          <View className="space-y-4">
            <View className="bg-white border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
              <Feather name="user" size={24} color="#696969" />
              <TextInput
                className="flex-1 text-black text-base"
                placeholder="nome"
                placeholderTextColor="#000"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
              <TouchableOpacity onPress={() => {}} className="p-1">
                <Feather name="edit-2" size={20} color="#696969" />
              </TouchableOpacity>
            </View>

            <View className="bg-white border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
              <Feather name="mail" size={24} color="#696969" />
              <TextInput
                className="flex-1 text-black text-base"
                placeholder="email"
                placeholderTextColor="#000"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => {}} className="p-1">
                <Feather name="edit-2" size={20} color="#696969" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-primary mt-8 rounded-lg py-4 shadow-lg"
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-bold text-center text-lg" style={{
                textShadowOffset: { width: 1, height: 1 },
                textShadowColor: 'black',
                textShadowRadius: 1
              }}>Salvar</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

