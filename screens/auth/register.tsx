import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Google from "../../assets/logos/google.svg"
import Facebook from "../../assets/logos/facebook.svg"

export default function Register() {
  const navigator = useNavigation()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
            <View className="mb-8 mt-4">
              <Text className="text-white text-4xl font-bold mb-2 text-center">Criar conta</Text>
              <Text className="text-gray-400 text-center">Preencha seus dados para se cadastrar</Text>
            </View>

            <View className="space-y-4 gap-3">
              <View className="bg-[#151515] border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
                <Feather name="user" size={24} color="#696969" />
                <TextInput
                  className="flex-1 text-white"
                  placeholder="nome"
                  placeholderTextColor="#696969"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View className="bg-[#151515] border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
                <Feather name="mail" size={24} color="#696969" />
                <TextInput
                  className="flex-1 text-white"
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

              <View className="bg-[#151515] border border-gray-400 rounded-lg p-3 flex-row items-center gap-2">
                <AntDesign name="lock" size={24} color="#696969" />
                <TextInput
                  className="flex-1 text-white"
                  placeholder="confirmar senha"
                  placeholderTextColor="#696969"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity className="bg-primary mt-8 rounded-lg py-4 shadow-lg">
              <Text className="text-white font-bold text-center text-lg" style={{
                textShadowOffset: { width: 1, height: 1 },
                textShadowColor: 'black',
                textShadowRadius: 1
              }}>Cadastrar</Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-700" />
              <Text className="text-gray-400 mx-4">ou</Text>
              <View className="flex-1 h-px bg-gray-700" />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity className="bg-[#151515] gap-2 rounded-lg py-3 flex-1 flex-row justify-center items-center shadow-lg">
                <Google width={20} height={20} />
                <Text className="text-white font-medium">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#151515] gap-2 rounded-lg py-3 flex-1 flex-row justify-center items-center shadow-lg">
                <Facebook width={20} height={20} />
                <Text className="text-white font-medium">Facebook</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-400">Já tem uma conta? </Text>
              <TouchableOpacity>
                <Text className="text-primary font-medium" onPress={() => navigator.navigate("Login" as never)}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}