import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import CarCard from '../components/CarCard';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dados estáticos de carros
const cars = [
  {
    id: 1,
    name: 'Mustang GT',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    brand: 'Ford',
    price_by_hour: 150.00,
  },
  {
    id: 2,
    name: 'BMW M3',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400',
    brand: 'BMW',
    price_by_hour: 180.00,
  },
  {
    id: 3,
    name: 'Mercedes-AMG',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
    brand: 'Mercedes',
    price_by_hour: 200.00,
  },
  {
    id: 4,
    name: 'Porsche 911',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
    brand: 'Porsche',
    price_by_hour: 250.00,
  },
  {
    id: 5,
    name: 'Audi RS7',
    image: 'https://images.unsplash.com/photo-1603584173870-7b297f066106?w=400',
    brand: 'Audi',
    price_by_hour: 190.00,
  },
  {
    id: 6,
    name: 'Chevrolet Camaro',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    brand: 'Chevrolet',
    price_by_hour: 140.00,
  },
];

export default function Home() {

  return (
    <SafeAreaView className="flex-1 ">
      <View className="px-4 pt-4">
        <Text className="text-black text-2xl font-bold mb-4">
          Olá, Roberto
        </Text>

        <View className=" border border-gray-700 rounded-lg px-3 py-3 flex-row items-center gap-2 mb-6">
          <Feather name="search" size={20} color="#696969" />
          <TextInput
            className="flex-1 text-white text-base"
            placeholder="Buscar carro..."
            placeholderTextColor="#696969"
          />
        </View>
      </View>

      <FlatList
        data={cars}
        renderItem={({ item }) => <CarCard
          id={item.id}
          name={item.name}
          image={item.image}
          brand={item.brand}
          price_by_hour={item.price_by_hour}
        />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

