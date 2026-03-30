import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

import Google from "../../assets/logos/google.svg"
import Facebook from "../../assets/logos/facebook.svg"

export default function Login(params: any) {
  const navigator = useNavigation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha email e senha');
      return;
    }

    setIsLoading(true);
    try {
      await signIn({ email, password });
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8 items-center"
          showsVerticalScrollIndicator={false}
        >
          <View className="max-w-[90%] gap-3 w-full">
            <View className='flex-row items-center justify-around mb-4'>

              <View className='border-2 border-white items-center justify-center w-20 h-20 bg-black rounded-full'>
                <Text className='text-primary text-3xl font-bold'>b</Text>
              </View>
              <Text className='text-white text-5xl'>
                <Text className='text-primary'>b</Text>yron<Text className='text-primary'>C</Text>ars
              </Text>
            </View>

            <View className="mb-8">
              <Text className="text-white text-4xl font-bold mb-2 text-center">Bem-vindo de volta</Text>
              <Text className="text-gray-400 text-center">Acesse sua conta usando seu email e senha</Text>
            </View>

            <View className="space-y-4 gap-3">
              <View className="bg-[#151515] border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
                <Feather name="mail" size={24} color="#696969" />
                <TextInput
                  className='flex-1 text-white'
                  placeholder="email"
                  placeholderTextColor="#696969"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="bg-[#151515] border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
                <AntDesign name="lock" size={24} color="#696969" />
                <TextInput
                  className="flex-1 text-white"
                  placeholder="senha"
                  placeholderTextColor="#696969"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity className="self-end mt-2">
                <Text className="text-white text-sm underline">Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              className="bg-primary mt-8 rounded-lg py-4 shadow-lg" 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-bold text-center text-lg" style={{
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowColor: 'black',
                  textShadowRadius: 1
                }}>Login</Text>
              )}
            </TouchableOpacity>
            
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-400">Não tem uma conta? </Text>
              <TouchableOpacity>
                <Text className="text-primary font-medium" onPress={() => navigator.navigate("Register" as never)}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

