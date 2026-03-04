import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CarCardProps {
  id: number;
  name: string;
  image: string;
  brand: string;
  price_by_hour: number;
}

export default function CarCard({ name, image, brand, price_by_hour }: CarCardProps) {
  return (
    <View className="bg-white rounded-xl overflow-hidden mb-4 shadow-lg flex-1 m-4">
      <View className="w-full h-32 bg-gray-200">
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      
      <View className="p-3  flex-row justify-between">
        <View>
        <Text className="text-black font-bold text-base mb-1" numberOfLines={1}>
          {name}
        </Text>
        
        <Text className="text-gray-500 text-xl mb-2">
          {brand}
        </Text>
        </View>
        <View>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-black text-xl font-bold"> R$ {price_by_hour.toFixed(2)}/h</Text>
        </View>
        
        <TouchableOpacity className=" bg-primary rounded-lg py-2">
          <Text className="text-black font-bold text-center text-sm">
            Alugar
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

